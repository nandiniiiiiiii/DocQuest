import Chat from "../components/Chat";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Upload from "../components/Upload";
import React from "react";

const Content: React.FC = () => {

    return (
        <>
            <Navbar />
            <div className="flex h-screen bg-black">
            {/* Left: Upload Component */}
            <div className="w-1/6 flex items-center justify-center">
                <Upload />
            </div>

            {/* Right: Chat Component */}
            <div className="w-5/6">
                <Chat />
            </div>
        </div>
            <Footer />
        </>
    );
};

export default Content;
