import { useState, ChangeEvent, useEffect, useRef } from "react";
import axios from "axios"; 

type Message = {
    sender: "user" | "bot";
    text: string;
};

function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (): Promise<void> => {
        if (input.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "user", text: input },
            ]);
            setInput(""); // Clear input field

            try {
                console.log("Hello1")
                // Make the POST request to FastAPI
                const response = await axios.post("http://localhost:8000/query/", {
                    question: input,
                });
                console.log(response)

                // Assuming the response format matches { question, context, answer }
                const botMessage = response.data.answer;

                // Add bot response to messages
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: "bot", text: botMessage },
                ]);
            } catch (error) {
                // Handle error
                console.error("Error querying the database:", error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: "bot", text: "Sorry, there was an error processing your request." },
                ]);
            }
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value);
    };

    return (
        <div className="flex flex-col h-screen bg-black text-white">

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-20 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`${
                                message.sender === "user"
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-700 text-white"
                            } px-4 py-2 rounded-lg max-w-sm`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="bg-black p-4 flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1 w-full bg-gray-700 text-white px-4 py-2 rounded-lg outline-none"
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSend}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 ml-4 rounded-lg font-semibold transition-colors duration-300"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;
