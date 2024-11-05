import React, { useEffect, useState } from 'react';
import https from '../axios';

const Home = () => {
  const [topPlaylists, setTopPlaylists] = useState([]);

  useEffect(() => {
    const fetchTopPlaylists = async () => {
      try {
        const token = localStorage.getItem('spotify_token'); 
        const response = await https.get('https://api.spotify.com/v1/browse/categories/toplists/playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTopPlaylists(response.data.playlists.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchTopPlaylists();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Good afternoon</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {topPlaylists.slice(0, 6).map((playlist, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-700 transition duration-300"
          >
            <img
              src={playlist.images[0]?.url}
              alt={playlist.name}
              className="w-16 h-16 rounded-md"
            />
            <span className="text-lg font-semibold">{playlist.name}</span>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4">Your top mixes</h3>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {topPlaylists.slice(0, 18).map((playlist, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 flex flex-col items-center hover:bg-gray-700 transition duration-300"
          >
            <img
              src={playlist.images[0]?.url}
              alt={playlist.name}
              className="w-full h-40 rounded-md mb-2"
            />
            <span className="text-sm font-medium text-center">{playlist.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
