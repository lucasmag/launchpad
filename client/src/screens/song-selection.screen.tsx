import React from "react";
import {Songs} from "@src/common/songs";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setName} from "@src/state/songSlice.ts";

export default function SongSelection() {
  const [songs] = React.useState(Object.values(Songs))
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function playSong(songName: string) {
    dispatch(setName(songName));
    navigate('/play');
  }

  return (
    <div className="flex flex-col gap-20">
      <h1 className="text-2xl font-semibold">Choose a song to play</h1>
      <div className="flex flex-col gap-5">
        {
          songs.map((song) => (
            <button
              className="text-gray-400 hover:text-white drop-shadow-md px-10 py-5 rounded-2xl bg-[#2c2c2c] border-2 hover:border-2"
              key={song.code}
              onClick={() => playSong(song.code)}
            >

              <h2 className="tracking-wide">{song.name}</h2>
            </button>
          ))
        }
      </div>
    </div>
  );
}