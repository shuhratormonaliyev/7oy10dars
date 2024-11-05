import React from "react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BiLibrary, BiPlusCircle } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

const LeftBar = () => {
  const playlists = [
    "Chill Mix",
    "Insta Hits",
    "Your Top Songs 2021",
    "Mellow Songs",
    "Anime Lofi & Chillhop Music",
    "BG Afro “Select” Vibes",
    "Afro “Select” Vibes",
    "Happy Hits!",
    "Deep Focus",
    "Instrumental Study",
    "OST Compilations",
    "Nostalgia for old souled millennials",
    "Mixed Feelings",
  ];

  return (
    <div className="w-full h-full bg-black text-white flex flex-col p-4 space-y-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <AiOutlineHome size={24} />
          <span className="text-sm font-semibold">Home</span>
        </div>
        <div className="flex items-center space-x-3">
          <AiOutlineSearch size={24} />
          <span className="text-sm font-semibold">Search</span>
        </div>
        <div className="flex items-center space-x-3">
          <BiLibrary size={24} />
          <span className="text-sm font-semibold">Your Library</span>
        </div>
      </div>

      <hr className="border-t border-gray-700" />

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <BiPlusCircle size={24} />
          <span className="text-sm font-semibold">Create Playlist</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaHeart size={24} className="text-purple-600" />
          <span className="text-sm font-semibold">Liked Songs</span>
        </div>
      </div>

      <hr className="border-t border-gray-700" />

      <div className="flex-1 overflow-y-auto scrollbar-hide mt-4">
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="text-sm text-gray-400 hover:text-white cursor-pointer"
          >
            {playlist}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftBar;
