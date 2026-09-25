import { Play, Pause, Repeat, ChevronsLeft, ChevronsRight, Volume2Icon } from "lucide-react";
import { useState, useContext } from "react";
import { MyPlayerContext } from "./AudioPlayer";
const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:2300';

export default function Player() {
  const [sliderState, setSliderState] = useState(0);
  const sharedData = useContext(MyPlayerContext);
  const { isPlaying, currentIndex, songs, togglePlay, nextSong, previousSong,handleSeek,  formattedTime, progressPercent } = sharedData;
  const currentSong = songs[currentIndex] || {};

  let iconColor = "black";
  let size = 40;

  let barStyles = {
    width: progressPercent + "%",
  };
  return (
    <div className="media">
      <div className="card">
        <div className="art-container">
          <img
          id="art"
          src={`${API_BASE_URL}/${currentSong.albumart}`}
          alt={currentSong.title || "Album"}
          width="400"
        />
    <div className="details">
          <div className="name">{currentSong.artist}</div>
          <div className="title">{currentSong.title}</div>
          <div className="year">{currentSong.year}</div>
          <div className="genre">{currentSong.genre}</div>
          <div className="album">{currentSong.album}</div>
        </div>
        
        </div>
        
      </div>
      <div className="controls">
        <div className="seekslider" id="seekslider">
          <div className="time">{formattedTime}</div>
          <div className="slider">
            <div className="rangeslid">
              <input
                className="range"
                type="range"
                name="range"
                max="100"
                id="range"
                title="range"
                value={progressPercent}
                onChange={(ev) => { setSliderState(ev.target.value); handleSeek(ev.target.value); }}
              />
            </div>
            <div className="progressBar" id="progressBar">
              <div className="bar" style={barStyles} id="bar"></div>
            </div>
          </div>
        </div>

        <div className="playback">
          <button type="button" id="loop" className="loop btn">
            <Repeat color={iconColor} size={size}></Repeat>
          </button>
          <button
            
            type="button"
            id="previousButton"
            className="pre btn"
            onClick={() => previousSong()}
          >
            <ChevronsLeft color={iconColor} size={size}></ChevronsLeft>
          </button>
          <button  type="button" id="playbutton" className="play btn" onClick={() => togglePlay()}>
            {isPlaying ? (
              <Pause color={iconColor} size={size}></Pause>
            ) : (
              <Play color={iconColor} size={size}></Play>
            )}
          </button>
          <button type="button" id="nextbutton" className="next btn" onClick={() => nextSong()}>
            <ChevronsRight color={iconColor} size={size}></ChevronsRight>
          </button>
          
          
           <button  type="button" id="loop" className="vol btn">
            <Volume2Icon color={iconColor} size={size}></Volume2Icon>
          </button>
        </div>
      </div>
    </div>
  );
}
