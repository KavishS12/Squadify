import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Database, TrendingUp, Shield, Users } from 'lucide-react';
import heroImage from '../assets/hero-main.png';
import {Link} from 'react-router-dom';

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(1);

  const features = [
    {
      icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
      title: "AI-Powered Squad Selection",
      description: "Leverage advanced machine learning models to predict and analyzes player performance, team dynamics, and tactical strategies to optimize football squad selection. "
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <motion.div 
          className="h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src={heroImage}
            alt="Football Squad"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="lg:text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Project Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-300 sm:text-4xl">
              Revolutionize Your Squad Building Strategy
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
              Squadify combines advanced machine learning, data analytics, and financial modeling to create the perfect football squad.
            </p>
          </motion.div>

          <motion.div 
            className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                variants={itemVariants}
                className={`flex flex-col p-6 rounded-lg transition-all duration-300 transform ${
                  activeFeature === index 
                    ? 'bg-gray-300 shadow-lg scale-105' 
                    : 'border border-gray-800 hover:bg-gray-100'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
                style={{ transformOrigin: 'center' }}
                whileHover={{ scale: activeFeature === index ? 1.05 : 1.03 }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {feature.icon}
                </motion.div>
                <div className="mt-2">
                  <h3 className={`text-lg font-semibold ${activeFeature === index ? 'text-gray-800' : 'text-gray-300 hover:text-gray-800'}`}>
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Key Technologies Section */}
      <div id="technology" className="bg-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="lg:text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">
              Cutting-Edge Technology
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-black sm:text-4xl">
              Powered by Advanced Machine Learning
            </p>
          </motion.div>
          <motion.div 
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-lg shadow-xl border border-gray-800 hover:border-blue-900 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-2xl"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <motion.div 
                className="flex items-center justify-center mb-4"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
              >
                <div className="bg-black p-3 rounded-full">
                  <Database className="w-8 h-8 text-blue-500" />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Predictive Modeling
              </h3>
              <p className="text-gray-400">
                Build a hybrid model using multiple ML techniques like XGBoost, Linear Regression, SVMs, Decision Trees and choose the best performing one for each type of stat based on validation loss
              </p>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-lg shadow-xl border border-gray-800 hover:border-blue-900 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-2xl"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <motion.div 
                className="flex items-center justify-center mb-4"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
              >
                <div className="bg-black p-3 rounded-full">
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Optimization Algorithms
              </h3>
              <p className="text-gray-400">
                Genetic Algorithm, enhanced with elitism preservation, formation balance enforcement, and nation/club-based chemistry boost calculations to discover optimal squads within budget constraints.
              </p>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-lg shadow-xl border border-gray-800 hover:border-blue-900 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-2xl"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <motion.div 
                className="flex items-center justify-center mb-4"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
              >
                <div className="bg-black p-3 rounded-full">
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Interactive Dashboard
              </h3>
              <p className="text-gray-400">
                Powered by React.js, with a MongoDB database, Express.js backend and Flask API to ensure smooth communication between the UI, Backend and ML models for real-time squad optimization.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-b from-black to-blue-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <motion.div 
            className="relative z-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to Revolutionize Your Squad Selection?
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Start building data-driven, high-performance teams today with Squadify.
            </p>
          </motion.div>
          <motion.div 
            className="mt-8 flex lg:mt-0 lg:flex-shrink-0 relative z-10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link to='/squad'>
              <motion.div 
                className="inline-flex items-center justify-center px-8 py-4 border border-blue-500 text-base font-medium rounded-md text-white bg-black shadow-lg transition-all duration-300 hover:border-blue-400"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer - UPDATED */}
      <footer id="footer" className="bg-gradient-to-br from-black to-blue-950 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">   
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-gray-300">Copyright &copy; 2025 All rights reserved.</p>
            <p className="mt-2 text-sm text-gray-300">
              Developed by Team Haxophone - Hacksplosion Project
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;