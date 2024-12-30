import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function About() {
  return (
    <>
      <Navbar />
      <section className="bg-black text-white py-20 text-center min-h-[590px] flex flex-col justify-center">
        <div className="container mx-auto px-4 py-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 hover:text-green-400">About DocQuest</h1>
          <p className="text-lg md:text-xl mb-8">
            DocQuest is your ultimate AI-powered document assistant. Our mission is to make knowledge accessible and effortless by transforming the way you interact with documents.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 hover:text-green-400">Our Vision</h2>
              <p>
                At DocQuest, we envision a world where finding answers in complex documents is as simple as asking a question. Empowering users to gain insights instantly is at the core of what we do.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 hover:text-green-400">Our Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Upload and process PDFs seamlessly</li>
                <li>Ask questions and receive AI-driven answers</li>
                <li>Access key insights in seconds</li>
              </ul>
            </div>
          </div>
          <div className="mt-12">
            <Link
              to="/content"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition-colors duration-300 inline-block"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>

  )
}

export default About