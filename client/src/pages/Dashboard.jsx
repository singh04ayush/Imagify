import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [stats, setStats] = useState({
    credits: 0,
    imagesGenerated: 0,
    favoriteStyles: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setError('Authentication required. Please login.');
        setIsLoading(false);
        navigate('/');
        return;
      }

      try {
        console.log('Fetching dashboard data with token:', token ? 'Yes' : 'No');
        
        const [creditsResponse, generationsResponse] = await Promise.all([
          axios.get(`${backendUrl}/api/user/credits`, {
            headers: { 
              token,
              'Content-Type': 'application/json'
            }
          }),
          axios.get(`${backendUrl}/api/image/user-generations`, {
            headers: { 
              token,
              'Content-Type': 'application/json'
            }
          })
        ]);

        console.log('Credits response:', creditsResponse.data);
        console.log('Generations response:', generationsResponse.data);

        if (creditsResponse.data.success && generationsResponse.data.success) {
          setStats({
            credits: creditsResponse.data.credits || 0,
            imagesGenerated: generationsResponse.data.totalGenerations || 0,
            favoriteStyles: generationsResponse.data.uniqueStyles || 0
          });
          setError(null);
        } else {
          const errorMessage = creditsResponse.data.message || generationsResponse.data.message || 'Failed to fetch dashboard data';
          console.error('Dashboard data error:', errorMessage);
          setError(errorMessage);
          if (errorMessage.includes('Authentication') || errorMessage.includes('login')) {
            navigate('/');
          }
          toast.error(errorMessage);
        }
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        const errorMessage = error.response?.data?.message || 'Failed to load dashboard data';
        setError(errorMessage);
        if (error.response?.status === 401 || errorMessage.includes('Authentication') || errorMessage.includes('login')) {
          navigate('/');
        }
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [token, backendUrl, navigate]);

  const handleGenerateClick = () => {
    navigate('/result');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section with Quick Stats */}
        <div className="bg-gradient-to-r from-teal-500 to-orange-500 rounded-xl shadow-sm p-8 text-white mb-8 relative overflow-hidden">
          {/* Animated background elements */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <h1 className="text-3xl font-bold mb-4 relative">
            <motion.span
              className="inline-block cursor-default relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 8px rgba(255,255,255,0.3)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              Welcome back,
            </motion.span>{' '}
            <motion.span
              className="inline-block cursor-pointer relative text-white font-bold"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 12px rgba(255,255,255,0.5)",
                transition: {
                  duration: 0.2
                }
              }}
            >
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
                  style={{
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 100%',
                    animation: 'gradient 3s linear infinite'
                  }}>
                  {user?.name}
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </motion.span>
            !{' '}
            <motion.span
              animate={{
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              👋
            </motion.span>
          </h1>
          
          <motion.p 
            className="text-lg opacity-90 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your creative journey continues...
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <p className="text-sm opacity-75">Available Credits</p>
              <p className="text-3xl font-bold">{stats.credits}</p>
            </motion.div>
            <motion.div 
              className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <p className="text-sm opacity-75">Images Created</p>
              <p className="text-3xl font-bold">{stats.imagesGenerated}</p>
            </motion.div>
            <motion.div 
              className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <p className="text-sm opacity-75">Styles Used</p>
              <p className="text-3xl font-bold">{stats.favoriteStyles}</p>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <button 
            onClick={handleGenerateClick}
            className="bg-teal-500 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105"
          >
            <div className="text-2xl mb-2">🎨</div>
            <h3 className="font-semibold">New Creation</h3>
            <p className="text-sm opacity-90 mt-1">Start generating</p>
          </button>
          <Link 
            to="/gallery" 
            className="bg-orange-500 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105"
          >
            <div className="text-2xl mb-2">🖼️</div>
            <h3 className="font-semibold">Gallery</h3>
            <p className="text-sm opacity-90 mt-1">View your work</p>
          </Link>
          <Link 
            to="/buy" 
            className="bg-purple-500 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105"
          >
            <div className="text-2xl mb-2">⭐</div>
            <h3 className="font-semibold">Get Credits</h3>
            <p className="text-sm opacity-90 mt-1">Power up</p>
          </Link>
          <Link 
            to="/features" 
            className="bg-blue-500 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105"
          >
            <div className="text-2xl mb-2">✨</div>
            <h3 className="font-semibold">Features</h3>
            <p className="text-sm opacity-90 mt-1">Learn more</p>
          </Link>
        </div>

        {/* AI Tips & Inspiration */}
        <div className="bg-gradient-to-br from-white to-teal-50 rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">AI Tips & Inspiration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-teal-600 text-lg mb-3">✨ Prompt Engineering</div>
              <p className="text-gray-600 mb-3">Be specific with details like style, mood, lighting, and perspective for better results.</p>
              <button 
                onClick={handleGenerateClick}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                Try Now →
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-orange-500 text-lg mb-3">🎨 Style Mixing</div>
              <p className="text-gray-600 mb-3">Combine different art styles like "watercolor meets cyberpunk" for unique creations.</p>
              <button 
                onClick={handleGenerateClick}
                className="text-orange-500 hover:text-orange-600 text-sm font-medium"
              >
                Try Now →
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-purple-600 text-lg mb-3">🌟 Pro Tips</div>
              <p className="text-gray-600 mb-3">Use descriptive adjectives and reference specific artists or time periods for inspiration.</p>
              <button 
                onClick={handleGenerateClick}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Try Now →
              </button>
            </div>
          </div>
        </div>

        {/* Resources & Help */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Tutorial</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 flex-shrink-0">1</div>
                <div>
                  <p className="font-medium text-gray-800">Choose Your Style</p>
                  <p className="text-gray-600 text-sm">Browse through our collection of AI art styles</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 flex-shrink-0">2</div>
                <div>
                  <p className="font-medium text-gray-800">Write Your Prompt</p>
                  <p className="text-gray-600 text-sm">Describe what you want to create in detail</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">3</div>
                <div>
                  <p className="font-medium text-gray-800">Generate & Share</p>
                  <p className="text-gray-600 text-sm">Create your image and share it with the world</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Need Help?</h3>
            <div className="space-y-4">
              <Link to="/features" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="text-2xl">📚</div>
                <div>
                  <p className="font-medium text-gray-800">Documentation</p>
                  <p className="text-gray-600 text-sm">Learn about all features</p>
                </div>
              </Link>
              <a href="#support" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="text-2xl">💬</div>
                <div>
                  <p className="font-medium text-gray-800">Support</p>
                  <p className="text-gray-600 text-sm">Get help when you need it</p>
                </div>
              </a>
              <Link to="/buy" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="text-2xl">⭐</div>
                <div>
                  <p className="font-medium text-gray-800">Premium Features</p>
                  <p className="text-gray-600 text-sm">Unlock more possibilities</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard; 