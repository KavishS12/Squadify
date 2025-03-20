import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LinkedIn from '../assets/linkedin.png';
import krish from '../assets/teamImages/krish.jpeg';
import shaurya from '../assets/teamImages/shaurya.jpg';
import kavish from '../assets/teamImages/kavish.jpeg';
import aditya from '../assets/teamImages/aditya.jpeg';
import { 
  Trophy, 
  Brain, 
  Dna, 
  LineChart, 
  Banknote, 
  Puzzle, 
  BarChart3, 
  Briefcase, 
  Search, 
  Users 
} from 'lucide-react';

const teamMembers = [
    {
      name: "Aditya Gosavi",
      image: aditya,
      linkedin: "https://linkedin.com/in/adityagosavi"
    },
    {
      name: "Kavish Shah",
      image: kavish,
      linkedin: "https://www.linkedin.com/in/kavish-shah-21a7531b0/"
    },
    {
      name: "Krish Didwania",
      image: krish,
      linkedin: "https://linkedin.com/in/krishdidwania"
    },
    {
      name: "Shaurya Gupta",
      image: shaurya,
      linkedin: "https://linkedin.com/in/shaurya-gupta-990752251"
    }
  ];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-black to-blue-950 text-white">
      {/* Hero Section with Animated Elements */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated pattern overlay */}
            <div className="absolute w-full h-full opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-blue-500 blur-3xl"></div>
              <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-500 blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-blue-700 blur-3xl"></div>
            </div>
          </div>
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-24 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              Redefining Football Squad Selection
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              In the high-stakes world of football, squad selection remains one of the most critical yet subjective decisions. Our algorithm changes the game by analyzing comprehensive performance data from Europe's top five leagues to identify player combinations that maximize team potential.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section with Cards */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="inline-block text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4">Our Mission</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              We build optimal starting XIs for European football clubs within budget constraints, 
              focusing on young talent and tactical balance for long-term success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <Trophy size={24} color="white" />,
                title: "Current Ability & Future Growth",
                description: "Identify high-potential young players through advanced predictive modeling of career trajectories and skill development patterns."
              },
              {
                icon: <Banknote size={24} color="white" />,
                title: "Market Value & Transfer Feasibility",
                description: "Sophisticated algorithms stay within budget constraints while maximizing value and considering contract situations and availability."
              },
              {
                icon: <Puzzle size={24} color="white" />,
                title: "Tactical Compatibility",
                description: "Ensure players fit the team's playing style through positional analysis, compatibility scoring, and formation optimization."
              },
              {
                icon: <BarChart3 size={24} color="white" />,
                title: "Performance Data",
                description: "Comprehensive analysis of recent statistics for consistency & impact across all major metrics and competition levels."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-2xl p-6 border border-blue-500/20 shadow-xl backdrop-blur-sm hover:shadow-blue-500/10 transition"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-blue-200">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Solution Section with Interactive Cards */}
      <div className="py-20 bg-gradient-to-b from-black to-blue-950/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="inline-block text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4">Our Solution</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                number: "01",
                title: "Statistic Based Approach",
                description: "Our platform processes over 6,000 player profiles across 5 seasons, integrating technical metrics from Europe's top leagues for comprehensive player analysis.",
                icon: <LineChart size={24} color="white" />
              },
              {
                number: "02",
                title: "Advanced Machine Learning",
                description: "Employing ensemble modeling for performance prediction, our system identifies hidden statistical patterns and continuously improves with new data.",
                icon: <Brain size={24} color="white" />
              },
              {
                number: "03",
                title: "Genetic Algorithm Optimisation",
                description: "Our platform generates thousands of potential squad combinations, balancing performance with long-term goals through evolutionary approaches.",
                icon: <Dna size={24} color="white" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl overflow-hidden shadow-xl relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/20 group-hover:to-indigo-600/20 transition-all duration-300"></div>
                <div className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div className="text-4xl font-black text-blue-500/20">{item.number}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                  <p className="text-blue-200">{item.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Market Opportunity with Statistics */}
      <div className="py-20 bg-gradient-to-b from-blue-950/30 to-black">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="inline-block text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4">Market Opportunity</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-8 text-center relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="text-4xl font-bold text-blue-400 mb-2">$2.5B+</div>
              <div className="text-lg font-medium">Sports Analytics Market</div>
              <div className="mt-2 text-blue-300 text-sm">Growing at 20% CAGR by 2030</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-8 text-center relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="text-4xl font-bold text-blue-400 mb-2">&gt;70%</div>
              <div className="text-lg font-medium">of Elite Clubs</div>
              <div className="mt-2 text-blue-300 text-sm">Are investing in AI for scouting</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-8 text-center relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="text-4xl font-bold text-blue-400 mb-2">150M+</div>
              <div className="text-lg font-medium">Fantasy Players</div>
              <div className="mt-2 text-blue-300 text-sm">Worldwide and growing rapidly</div>
            </motion.div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-2xl p-8 max-w-5xl mx-auto shadow-xl border border-blue-500/20">
            <h3 className="text-2xl font-bold mb-6 text-center text-white">Target Audiences</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Briefcase size={24} color="white" />,
                  title: "Coaches & Managers",
                  description: "Data-driven suggestions for major decisions"
                },
                {
                  icon: <Trophy size={24} color="white" />,
                  title: "Fantasy Football Users",
                  description: "Competitive edge through advanced analytics"
                },
                {
                  icon: <Search size={24} color="white" />,
                  title: "Scouting Agencies",
                  description: "Access to modular program for additional intelligence"
                },
                {
                  icon: <Users size={24} color="white" />,
                  title: "Football Enthusiasts",
                  description: "Interactive platform to learn about players"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-800/20 to-indigo-800/20 rounded-xl p-4 text-center shadow-lg border border-blue-500/10 hover:border-blue-400/30 transition"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-blue-200 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section with Hover Effects */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="inline-block text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4">Meet The Team</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </motion.div>
          
          <div className="flex justify-center flex-wrap gap-8 max-w-6xl mx-auto px-4">
            {teamMembers.map((member, index) => (
            <div 
                key={index} 
                className="w-60 h-80 rounded-xl bg-gradient-to-b from-indigo-900 to-purple-600 transition-transform duration-700 hover:scale-105"
            >
                <div className="relative top-[1.5%] left-[1.5%] w-[97%] h-[97%] bg-gray-900 rounded-xl flex flex-col items-center">
                <div className="text-white text-2xl mt-5">{member.name}</div>
                <div className="text-white text-lg mt-2 opacity-70">{member.designation}</div>
                
                <div className="mt-5">
                    <img 
                    src={member.image} 
                    alt={member.name} 
                    className="h-36 w-36 rounded-full object-cover bg-gray-300 transition-transform duration-700 hover:scale-110"
                    />
                </div>
                
                <div className="mt-5 flex justify-around w-4/5">
                    {member.linkedin && (
                    <div className="w-10 h-10 rounded-full transition-transform duration-500 hover:scale-110">
                        <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        >
                        <img src={LinkedIn} alt="LinkedIn" className='w-10 h-10'/>
                        </a>
                    </div>
                    )}
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
      </div>
      
      {/* Call To Action */}
      <div className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-blue-950"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center p-10 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-3xl shadow-xl border border-blue-500/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              Ready to Revolutionize Your Squad Selection?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join the teams already leveraging data science for competitive advantage
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link to="/squad">
                <button className="bg-blue-900/50 backdrop-blur-sm border border-blue-400/30 px-8 py-4 rounded-full font-semibold text-lg transition transform hover:scale-105 hover:shadow-lg shadow-md">
                    Get Started
                </button>
                </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;