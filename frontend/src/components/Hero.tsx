import { Link } from "react-router-dom"

function Hero() {
    return (
        <section className="bg-black text-white py-20 text-center min-h-[590px] flex flex-col justify-center">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Embark on Your DocQuest</h1>
                <p className="text-lg md:text-xl mb-8">
                    Upload PDFs, Ask Questions, and Uncover Answers Instantly with AI.
                </p>
                <div className="space-x-4">
                    <Link to="/content" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition-colors duration-300 inline-block">
                        Start Your Quest
                    </Link>
                    <Link to="/about" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors duration-300 inline-block">
                        Explore Features
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero