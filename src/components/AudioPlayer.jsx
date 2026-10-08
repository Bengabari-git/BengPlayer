import React, {
  useState,
  useEffect,
  createContext,
  useRef,
  
} from "react";

import {io} from 'socket.io-client'


const API_BASE_URL = import.meta.env.API_URL || "https://node-mi59.onrender.com";
const socket = io(API_BASE_URL)
const MyPlayerContext = createContext(null);

function AudioPlayer({ children }) {
  const [songs, setSongs] = useState([]); // Populated via your Socket listener
  const [currentIndex, setCurrentIndex] = useState(0);
  const [looped, setLoop] = useState(false)
  

  // --- Playback States ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  // Hidden <audio> reference
  const audioRef = useRef(null);

  const currentSong = songs[currentIndex];

  
  // 1. Play / Pause Toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 2. Play Specific Song from Playlist
  const playSongAtIndex = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  // 3. Next Song Logic
  const nextSong = () => {
    if (songs.length === 0) return;
    const nextIdx = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIdx);
    setIsPlaying(true);
  };

  // 4. Previous Song Logic
  const previousSong = () => {
    if (songs.length === 0) return;
    const prevIdx = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIdx);
    setIsPlaying(true);
  };

  const loopAudio = () =>{
    if (!audioRef.current.loop){
      setLoop(!looped)
      audioRef.current.loop = looped;
    }
  }

const changeVolume = (volPercent) => {
  if(!audioRef.current) return;
  const newVolume = volPercent / 100;
  
  setVolume(newVolume);
  audioRef.current.volume = volume;
}

  // 5. Seek Handler (Triggered by range slider)
  const handleSeek = (newPercent) => {
    if (!audioRef.current || !duration) return;
    const newTime = (newPercent / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // 6. Time Formatter Utility (Converts seconds to 00:00)
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const min = Math.floor(timeInSeconds / 60);
    const sec = Math.floor(timeInSeconds % 60);
    const cmin = min < 10 ? `0${min}` : min;
    const csec = sec < 10 ? `0${sec}` : sec;
    return `${cmin}:${csec}`;
  };

  // Automatically trigger .play() when song changes if isPlaying is true
  useEffect(() => {
    if (currentSong && isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentIndex, currentSong]);

 
  const handleGetSongs = () => {
    socket.emit('get-files', (data) => {
        console.log(socket.disconnected);
        setSongs(data);
    });
  };

  useEffect(() => {
    try{
      handleGetSongs();
    }catch(error){
      console.log("error occured");
      console.log(socket.disconnected);
    }
    
  }, []);

  useEffect(() => {
    console.log(songs);
  }, [songs]);

  return (
    <MyPlayerContext.Provider
      value={{
        looped,
        songs,
        setSongs,
        setVolume,
        volume,
        changeVolume,
        currentSong,
        currentIndex,
        isPlaying,
        currentTime,
        duration,
        togglePlay,
        playSongAtIndex,
        nextSong,
        previousSong,
        handleGetSongs,
        handleSeek,
        loopAudio,
        formattedTime: `${formatTime(currentTime)} / ${formatTime(duration)}`,
        progressPercent: duration ? (currentTime / duration) * 100 : 0,
      }}
    >
      {/* Hidden Global Audio Element */}
      {currentSong && (
        <audio
          ref={audioRef}
          src={
            `${API_BASE_URL}/${currentSong.path}`
          }
         
          onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          onLoadedMetadata={() => setDuration(audioRef.current.duration)}
          
          onEnded={nextSong}
        />
      )}
      {children}
    </MyPlayerContext.Provider>
  );
}

export { MyPlayerContext, AudioPlayer };
