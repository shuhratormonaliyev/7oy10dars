import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import https from "../axios";

const Details = () => {
  const location = useLocation();
  const { playlist } = location.state || {};
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState();
  const [audio, setAudio] = useState();
  const [currentTrack, setCurrentTrack] = useState();

  if (!playlist) {
    return <div>Playlist not available</div>;
  }

  const fetchTracks = async () => {
    try {
      const token = localStorage.getItem("spotify_token");
      const response = await https.get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTracks(response.data.items);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setError("Error fetching tracks");
    }
  };

  useEffect(() => {
    fetchTracks();
  }, [playlist.id]);

  const playTrack = (track) => {
    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(track.track.preview_url);
    newAudio.play();
    setAudio(newAudio);
    setCurrentTrack(track);
  };

  const pauseTrack = () => {
    if (audio) {
      audio.pause();
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="flex gap-20">
        <div className="mb-10 w-[297px] h-[297px]">
          <img
            src={playlist.images[0]?.url}
            alt={playlist.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="w-96 h-32">
          <p className="text-1xl font-bold mb-4">PUBLIC PLAYLIST</p>
          <h2 className="text-7xl font-serif mb-4 w-[297px] h-[100px]">{playlist.name}</h2>
        </div>
      </div>
      <h1 className="text-xl mb-2">Tracks</h1>

      {error && <div className="text-red-500">{error}</div>}

      <ul>
        {tracks.map((track, index) => (
          <li key={index} className="mb-4 flex items-center gap-4">
            <img
              src={track.track.album.images[0]?.url}
              alt={track.track.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <span className="font-medium">{track.track.name}</span> - {track.track.artists.map(artist => artist.name).join(", ")}
            </div>
            <div>
              <button
                onClick={() => playTrack(track)}
                className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Play
              </button>
              <button
                onClick={pauseTrack}
                className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Pause
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
