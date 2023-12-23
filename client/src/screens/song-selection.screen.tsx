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
      <h1 className="font-black text-xl">Choose a song to play</h1>
      <div className="flex flex-col gap-5">
        {
          songs.map((song) => (
            <button className="px-10 py-5 rounded-2xl bg-[#2c2c2c]" key={song.code} onClick={() => playSong(song.code)}>

              <h5 className="font-bold">{song.name}</h5>
            </button>
          ))
        }
      </div>
    </div>
  );
}