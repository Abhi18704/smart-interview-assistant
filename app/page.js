import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">AI Voice Agent</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#features" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">How It Works</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              <a href="#try-now" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Try Now</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Revolutionize Interviews with AI Voice Agent
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Conduct seamless, intelligent, and engaging interviews with our cutting-edge AI-powered voice technology.
            </p>
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <a href="#try-now" className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700">Get Started</a>
              <a href="#demo" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-50">Watch Demo</a>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img src="agent.png" alt="AI Voice Agent" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Why Choose Our AI Voice Agent?</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">🎙️</div>
              <h3 className="text-xl font-semibold text-gray-900">Natural Conversations</h3>
              <p className="mt-2 text-gray-600">Engage candidates with human-like voice interactions powered by advanced NLP.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900">Real-Time Analysis</h3>
              <p className="mt-2 text-gray-600">Instantly evaluate responses with sentiment and competency analysis.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-gray-900">Multi-Language Support</h3>
              <p className="mt-2 text-gray-600">Conduct interviews in multiple languages with seamless translation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">How It Works</h2>
          <div className="mt-12 space-y-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <img src="schedule.jpg" alt="Step 1" className="rounded-lg shadow-md" />
              </div>
              <div className="md:w-1/2 mt-6 md:mt-0 md:pl-10">
                <h3 className="text-2xl font-semibold text-gray-900">1. Schedule the Interview</h3>
                <p className="mt-2 text-gray-600">Easily set up interviews with our intuitive dashboard and send invites to candidates.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2">
                <img src="conduct.png" alt="Step 2" className="rounded-lg w-100 h-100" />
              </div>
              <div className="md:w-1/2 mt-6 md:mt-0 md:pr-10">
                <h3 className="text-2xl font-semibold text-gray-900">2. Conduct the Interview</h3>
                <p className="mt-2 text-gray-600">Our AI conducts the interview, asking tailored questions and adapting to responses.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <img src="review.png" alt="Step 3" className="rounded-lg shadow-md" />
              </div>
              <div className="md:w-1/2 mt-6 md:mt-0 md:pl-10">
                <h3 className="text-2xl font-semibold text-gray-900">3. Review Insights</h3>
                <p className="mt-2 text-gray-600">Receive detailed reports with actionable insights to make informed hiring decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="try-now" className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold">Ready to Transform Your Hiring Process?</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">Join thousands of companies using our AI Voice Agent to streamline interviews and find top talent.</p>
          <div className="mt-8">
            <a href="http://smart-interview-assistant-eight.vercel.app/auth" className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100">Start Free Trial</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold">AI Voice Agent</h3>
              <p className="mt-2 text-gray-400">Empowering companies to hire smarter with AI-driven interviews.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white">How It Works</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <p className="mt-2 text-gray-400">Email: abhigolanakonda4546@gmail.com</p>
              <p className="mt-1 text-gray-400">Phone: +91 8712318704 </p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 AI Voice Agent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;