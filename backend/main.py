from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from PyPDF2 import PdfReader
from sentence_transformers import SentenceTransformer
from langchain.vectorstores import FAISS
from llama_index.core import GPTVectorStoreIndex, SimpleDirectoryReader
# from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader
from llama_index import TextDocument
from llama_index import Document, VectorStoreIndex 
from transformers import pipeline
from typing import List
from faiss import IndexFlatL2
import tempfile
import os
import logging
import numpy as np

# Configure logging
logging.basicConfig(level=logging.INFO)  # Use DEBUG for more verbosity
logger = logging.getLogger(__name__)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL, e.g., ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables to store the vector database and index
vector_db = None
index = None

# Load Hugging Face embeddings and model (you can replace with other models if needed)
embeddings_model = SentenceTransformer('all-MiniLM-L6-v2')  # Hugging Face Sentence-Transformer model
llm = pipeline("text-generation", model="microsoft/DialoGPT-medium")

# Route to check if the API is running
@app.get("/")
def read_root():
    return {"message": "FastAPI is up and running"}

# handles file upload
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Save the uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            temp_file.write(await file.read())
            file_path = temp_file.name

        # Read the PDF and extract its text
        with open(file_path, "rb") as pdf_file:
            reader = PdfReader(pdf_file)
            text = ""
            for page in reader.pages:
                text += page.extract_text()

        if not text.strip():
            return {"error": "No text could be extracted from the PDF."}

        # Split text into smaller chunks for embeddings
        chunks = [text[i:i + 512] for i in range(0, len(text), 512)]  # Adjust chunk size as needed

        # Create documents (wrap each chunk in a Document object)
        documents = [Document(text=chunk) for chunk in chunks]

        # Create the VectorStoreIndex
        index = VectorStoreIndex.from_documents(documents)

        # Cleanup temporary file
        os.remove(file_path)

        return {"message": "PDF uploaded and processed successfully!"}

    except Exception as e:
        logger.error(f"Error occurred: {str(e)}")
        return {"error": str(e)}


class QueryRequest(BaseModel):
    question: str

# to handle query/Q&A
@app.post("/query/")
async def query_database(request: QueryRequest):
    try:
        print("Hello")
        if not vector_db or not index:
            return {"error": "No document has been uploaded yet."}
        
        # Perform similarity search in vector database
        docs = vector_db.similarity_search(request.question, k=3)
        
        # Retrieve context
        context = " ".join([doc.page_content for doc in docs])
        
        # Combine context and question
        combined_input = f"Context: {context}\nQuestion: {request.question}"
        
        # Generate answer using the Hugging Face conversational model with context
        chat_response = llm(combined_input)  # Hugging Face conversational model response
        
        # Assuming response is in a dictionary format with the generated text
        return {
            "question": request.question,
            "context": context,
            "answer": chat_response[0]['generated_text']  # Assuming response is in a dictionary format
        }
    
    except Exception as e:
        return {"error": str(e)}

