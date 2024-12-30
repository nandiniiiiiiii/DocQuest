import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="bg-black text-white p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div className="text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} DocQuest. All rights reserved.</p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-end space-x-6">
                    <Link to="/" className="hover:text-green-400 transition-colors duration-300">Privacy Policy</Link>
                    <Link to="/" className="hover:text-green-400 transition-colors duration-300">Terms of Service</Link>
                    <Link to="/" className="hover:text-green-400 transition-colors duration-300">Contact Us</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer