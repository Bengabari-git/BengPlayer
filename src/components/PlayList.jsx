import { TrashIcon, Play, Music } from "lucide-react";
import { MyPlayerContext } from "./AudioPlayer";
import { useContext } from "react";

export default function PlayList() {
  const sharedData = useContext(MyPlayerContext);
  const { songs, isEmpty, playSongAtIndex, currentIndex } = sharedData;
  const songList = songs || [];

  const iconColor = "black";
  return (
    <div className="PlayList">
      <div className="theList">
        <h2>Playlist</h2>
        {songList.length === 0 ? (
          <div className="empty-state">
            <Music className="empty-icon" size={48} />
            <p>No songs on playlist</p>
          </div>
        ) : 
        (<ul id="list" className="list">
          {songList.map((song, index) => (
            <li key={index} className={index === currentIndex ? "activeIndex" : "inActive"} onClick={() => playSongAtIndex(index)}>
              <div className="song">
                <div className="artist single-line">{song.artist}</div>
                <div className="song single-line">{song.title}</div>
              </div>

              <div className="buttons">
                <div className="medTime">{song.duration}</div>
                
                <button
                  title="delete song"
                  type="button"
                  className="IconButton"
                >
                  <TrashIcon color={iconColor}></TrashIcon>
                </button>
              </div>
            </li>
          ))}
        </ul>)}
      </div>
    </div>
  );
}
