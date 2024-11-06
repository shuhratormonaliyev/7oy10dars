import React, { useEffect, useState } from "react";
import https from "../axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [topPlaylists, setTopPlaylists] = useState([]);
  const [topMix, setTopMix] = useState([]);
  const [forYou, setForYou] = useState([]);
  const [played, setPlayed] = useState([]);
  const [backIn, setBackIn] = useState([]);
  const [yours, setYours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          https.get("categories/toplists/playlists"),
          https.get("categories/0JQ5DAqbMKFHOzuVTgTizF/playlists"),
          https.get("categories/0JQ5DAqbMKFQ00XGBls6ym/playlists"),
          https.get("categories/0JQ5DAqbMKFLVaM30PMBm4/playlists"),
          https.get("categories/0JQ5DAqbMKFCbimwdOYlsl/playlists"),
        ]);

        setTopMix(responses[0].data.playlists.items);
        setForYou(responses[1].data.playlists.items);
        setPlayed(responses[2].data.playlists.items);
        setBackIn(responses[3].data.playlists.items);
        setYours(responses[4].data.playlists.items);

        const token = localStorage.getItem("spotify_token");
        const topPlaylistsResponse = await https.get(
          "https://api.spotify.com/v1/browse/categories/toplists/playlists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTopPlaylists(topPlaylistsResponse.data.playlists.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (playlist) => {

    navigate(`/details/${playlist.id}`, { state: { playlist } });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Good afternoon</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {topPlaylists.slice(0, 6).map((playlist, index) => (
          <div
            key={index}
            onClick={() => handleChange(playlist)}
            className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-700 transition duration-300 cursor-pointer"
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
      <div className="grid grid-cols-4 gap-4 mb-8">
        {topMix.slice(0, 4).map((playlist, index) => (
          <div
            key={index}
            onClick={() => handleChange(playlist)}
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

      <h3 className="text-xl font-bold mb-4">MADE FOR YOU</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {forYou.slice(0, 4).map((playlist, index) => (
          <div
            key={index}
            onClick={() => handleChange(playlist)}
            className="bg-gray-800  rounded-lg p-4 flex flex-col items-center hover:bg-gray-700 transition duration-300"
          >
            <img
              width={250}
              height={250}
              src={playlist.images[0]?.url}
              alt={playlist.name}
              className="w-full h-40 rounded-md mb-2 "
            />
            <span className="text-sm font-medium text-center">{playlist.name}</span>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4">RECENT PLAYED</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {played.slice(0, 4).map((playlist, index) => (
          <div
            key={index}
            onClick={() => handleChange(playlist)}
            className="bg-gray-800 rounded-lg p-4 flex flex-col items-center hover:bg-gray-700 transition duration-300"
          >
            <img
              width={250}
              height={250}
              src={playlist.images[0]?.url}
              alt={playlist.name}
              className="w-full h-40 rounded-md mb-2"
            />
            <span className="text-sm font-medium text-center">{playlist.name}</span>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4">JUMP BACK IN</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {backIn.slice(0, 4).map((playlist, index) => (
          <div
            key={index}
            onClick={() => handleChange(playlist)}
            className="bg-gray-800 rounded-lg p-4 flex flex-col items-center hover:bg-gray-700 transition duration-300"
          >
            <img
              width={250}
              height={250}
              src={playlist.images[0]?.url}
              alt={playlist.name}
              className="w-full h-40 rounded-md mb-2"
            />
            <span className="text-sm font-medium text-center">{playlist.name}</span>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4">UNIQUELY YOURS</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {yours.slice(0, 4).map((playlist, index) => (
          <div
            key={index}
            onClick={() => handleChange(playlist)}
            className="bg-gray-800 rounded-lg p-4 flex flex-col items-center hover:bg-gray-700 transition duration-300"
          >
            <img
              width={250}
              height={250}
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
