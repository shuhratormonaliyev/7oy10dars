import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const RightBar = () => {
  const friends = [
    { id: 1, name: "Friend 1", status: "Listening to..." },
    { id: 2, name: "Friend 2", status: "Listening to..." },
    { id: 3, name: "Friend 3", status: "Listening to..." },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-gray-900 text-white p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Friend Activity</h2>
        <FiSettings size={20} className="cursor-pointer" />
      </div>

      <p className="text-sm text-gray-400">
        Let friends and followers on Spotify see what you're listening to.
      </p>

      <div className="space-y-4">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center space-x-3">
            <FaUserCircle size={40} className="text-gray-500" />
            <div>
              <p className="text-sm font-semibold">{friend.name}</p>
              <p className="text-xs text-gray-400">{friend.status}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Go to Settings &gt; Social and enable "Share my listening activity on
        Spotify." You can turn this off at any time.
      </p>

      <button className="mt-4 py-2 px-4 bg-white text-black rounded-full font-semibold">
        SETTINGS
      </button>
    </div>
  );
};

export default RightBar;
