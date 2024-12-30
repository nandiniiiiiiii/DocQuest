import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <>
            <header className="fixed w-full z-10 bg-black shadow-lg transition-all duration-300">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <Link to="/" className="flex items-center space-x-2 text-white hover:text-green-400 transition-colors duration-300">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 7L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 12L17 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 17L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-2xl font-bold">DocQuest</span>
                        </Link>
                        <button
                            className="text-white hover:text-green-400 transition-colors duration-300"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <nav className="bg-black p-8 mx-20 absolute right-0 w-min-[400px] rounded">
                        <div className="container px-4 flex flex-col space-y-4">
                            <Link
                                to="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white hover:text-green-400 transition-colors duration-300 text-lg font-medium"
                            >Home</Link>
                            <Link
                                to="/about"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white hover:text-green-400 transition-colors duration-300 text-lg font-medium"
                            >About</Link>
                            <Link
                                to="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white hover:text-green-400 transition-colors duration-300 text-lg font-medium"
                            >Contact</Link>
                        </div>
                    </nav>
                )}
            </header>
        </>
    )
}

export default Navbar