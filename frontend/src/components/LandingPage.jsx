import React, { useState } from 'react';
import { ChevronRight, Database, TrendingUp, Shield, Users } from 'lucide-react';
import heroImage from '../assets/hero-main.png';

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(1);

  const features = [
    {
      icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
      title: "AI-Powered Squad Selection",
      description: "Leverage advanced machine learning models to predict player performance, market trends, and injury risks with unprecedented accuracy."
    },
    {
      icon: <Shield className="w-12 h-12 text-green-600" />,
      title: "Cost-Effective Team Building",
      description: "Identify undervalued players with high potential, maximizing return on investment while staying within your budget constraints."
    },
    {
      icon: <Database className="w-12 h-12 text-purple-600" />,
      title: "Tactical & Financial Balance",
      description: "Optimize squad selection to ensure perfect formation fit and financial feasibility, all powered by advanced data analytics."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div className="h-screen">
          <img
            src={heroImage}
            alt="Football Squad"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Project Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-300 sm:text-4xl">
              Revolutionize Your Squad Building Strategy
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
              Squadify combines advanced machine learning, data analytics, and financial modeling to create the perfect football squad.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={`flex flex-col p-6 rounded-lg transition-all duration-300 transform ${
                  activeFeature === index 
                    ? 'bg-gray-300 shadow-lg scale-105' 
                    : 'hover:bg-gray-100'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
                style={{ transformOrigin: 'center' }}
              >
                <div>
                  {feature.icon}
                </div>
                <div className="mt-2">
                  <h3 className={`text-lg font-semibold ${activeFeature === index ? 'text-gray-800' : 'text-gray-300 hover:text-gray-800'}`}>
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rest of the sections remain the same but with proper container constraints */}
      {/* Key Technologies Section */}
      <div id="technology" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Cutting-Edge Technology
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Powered by Advanced Machine Learning
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Predictive Modeling
              </h3>
              <p className="text-gray-600">
                Utilize XGBoost, LSTM, and SARIMA to predict player performance, market trends, and skill development.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Optimization Algorithms
              </h3>
              <p className="text-gray-600">
                Genetic Algorithms and Graph-Based Search techniques to find the optimal squad within budget constraints.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Interactive Dashboard
              </h3>
              <p className="text-gray-600">
                Powered by React.js and Power BI, providing real-time insights and customizable squad selection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to Optimize Your Football Squad?
            </h2>
            <p className="mt-4 text-lg text-blue-200">
              Start building data-driven, high-performance teams today with Squadify.
            </p>
          </div>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
            >
              Get Started <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="footer" className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>Copyright &copy; 2025 All rights reserved.</p>
            <p className="mt-2 text-sm text-gray-400">
              Developed by Team Haxophone - Hacksplosion Project
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;