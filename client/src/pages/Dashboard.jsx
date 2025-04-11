import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user, token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    credits: 0,
    imagesGenerated: 0,
    favoriteStyles: 0
  });
  const [recentGenerations, setRecentGenerations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setError('No authentication token found');
        setIsLoading(false);
        return;
      }

      try {
        // Fetch user credits and generations in parallel
        const [creditsResponse, generationsResponse] = await Promise.all([
          axios.get(`${backendUrl}/api/user/credits`, {
            headers: { token }
          }),
          axios.get(`${backendUrl}/api/image/user-generations`, {
            headers: { token }
          })
        ]);

        if (creditsResponse.data.success && generationsResponse.data.success) {
          setStats({
            credits: creditsResponse.data.credits || 0,
            imagesGenerated: generationsResponse.data.totalGenerations || 0,
            favoriteStyles: generationsResponse.data.uniqueStyles || 0
          });
          setRecentGenerations(generationsResponse.data.recentGenerations || []);
          setError(null);
        } else {
          setError('Failed to fetch dashboard data');
          toast.error('Failed to load dashboard data');
        }
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        setError('Failed to load dashboard data');
        toast.error(error.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [token, backendUrl]);

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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your account</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">Available Credits</h3>
            <p className="text-3xl font-bold text-teal-600 mt-2">{stats.credits}</p>
            <Link to="/buy" className="mt-4 inline-block text-teal-600 hover:text-teal-700">
              Buy More Credits →
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">Images Generated</h3>
            <p className="text-3xl font-bold text-orange-500 mt-2">{stats.imagesGenerated}</p>
            <Link to="/gallery" className="mt-4 inline-block text-orange-500 hover:text-orange-600">
              View Gallery →
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">Favorite Styles</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">{stats.favoriteStyles}</p>
            <Link to="/features" className="mt-4 inline-block text-purple-600 hover:text-purple-700">
              Explore Styles →
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Generations</h2>
          {recentGenerations.length > 0 ? (
            <div className="space-y-4">
              {recentGenerations.map((generation) => (
                <div key={generation._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{generation.prompt}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(generation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link 
                    to={`/result/${generation._id}`} 
                    className="text-teal-600 hover:text-teal-700"
                  >
                    View Result
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No generations yet. Start creating!</p>
              <button 
                onClick={handleGenerateClick}
                className="mt-4 inline-block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
              >
                Generate Your First Image
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={handleGenerateClick}
            className="bg-gradient-to-r from-teal-500 to-orange-500 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <h3 className="text-xl font-semibold">Generate New Image</h3>
            <p className="mt-2 opacity-90">Create something amazing with AI</p>
          </button>
          <Link 
            to="/gallery" 
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800">Your Gallery</h3>
            <p className="mt-2 text-gray-600">View and manage your creations</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 