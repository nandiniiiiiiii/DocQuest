import React, { useState, DragEvent, ChangeEvent } from "react";
import axios from "axios"; 

const Upload: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>("");
    const [uploaded, setUploaded] = useState(false);

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === "application/pdf") {
            setFile(droppedFile);
            setError("");
        } else {
            setError("Only PDF files are allowed.");
        }
    };

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile && uploadedFile.type === "application/pdf") {
            setFile(uploadedFile);
            setError("");
            const formData = new FormData();
            formData.append("file", uploadedFile);
            try {
                // Send the file to the backend
                const response = await axios.post("http://localhost:8000/upload/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log(response);
                setUploaded(true);
            } catch (error) {
                setError("File upload failed.");
                setUploaded(false);
            }
        } else {
            setError("Only PDF files are allowed.");
            setUploaded(false);
        }
    };

    return (
        <div className="flex items-center justify-center flex-col w-full pl-4 h-screen">
            <div
                className={`w-full max-w-[400px] h-5/6 mt-10 border-2 rounded ${
                    isDragging ? "border-green-400 bg-gray-800" : "border-gray-600 bg-gray-800"
                } border-dashed flex flex-col items-center justify-center transition-all duration-300`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {file ? (
                    <p className="text-center text-white text-lg">
                        Uploaded: {file.name}
                    </p>
                ) : (
                    <p className="text-center text-gray-300 hover:text-green-400 text-base">
                        Drag & drop your PDF here or{" "}
                        <label
                            htmlFor="file-upload"
                            className="text-green-400 underline cursor-pointer"
                        >
                            browse
                        </label>
                        .
                    </p>
                )}
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                />
            </div>
            {error && (
                <p className="absolute bottom-8 text-red-400 text-sm text-center">{error}</p>
            )}
        </div>
    );
};

export default Upload;
