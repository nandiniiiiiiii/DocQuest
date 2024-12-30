function HowItWorks() {
  return (
    <div>
      <section id="how-it-works" className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-100 to-white text-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Follow these three simple steps to get started!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
            <div className="bg-white shadow-md rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <div className="text-blue-500 text-6xl font-bold mb-4">1</div>
              <p className="text-gray-700">
                Upload your PDF using the upload area.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <div className="text-blue-500 text-6xl font-bold mb-4">2</div>
              <p className="text-gray-700">
                Type your question in the chatbot interface.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <div className="text-blue-500 text-6xl font-bold mb-4">3</div>
              <p className="text-gray-700">
                Receive accurate answers instantly!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;
