import { MenuIcon, UploadCloud, X } from "lucide-react";
import { useRef, useState,useEffect, useContext } from "react";
import UploadProgress from "./UploadProgress";
import { MyPlayerContext } from "./AudioPlayer";
import { useSharedData } from "./BarContext";
const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:2300';


function Topbar() {
  let iconsize = 16;
  let fileInputRef = useRef(null);
  const sharedData = useContext(MyPlayerContext)
  const getHandler = sharedData.handleGetSongs;
  
  let iconColor = "aliceblue";
  let size = 27;

  const {isVisible,  toggleVisible} = useSharedData()
  
  const [uploadState, setUploadState] = useState({
    percent: 0,
    totalFiles: 0,
    uploaded: 0,
    name: "",
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");

  

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (ev) => {
    let theFiles = ev.target.files;
    for (let f = 0; f < theFiles.length; f++) {
      const file = theFiles[f];
      console.log(file);
      setUploadState({
        percent: 0,
    totalFiles: 0,
    uploaded: 0,
    name: "",
      })
      await fileUploadAsync(file, f, theFiles.length);
    }
  };

  const fileUploadAsync = (file, f, filesNo) => {
    try {
      return new Promise(function (res, rej) {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        formData.append("file", file);
        setStatus("Uploading file(s)...");
        setModalOpen(true);

        xhr.open("POST", `${API_BASE_URL}/sendFile`, true);

        xhr.upload.addEventListener("progress", function (e) {
          if (e.lengthComputable) {
            console.log(Math.floor(e.loaded));
            console.log(f + 1 + " of " + filesNo, file.name);
            setUploadState({
              totalFiles: filesNo ,
              uploaded: (f + 1),
              percent: Math.floor((e.loaded / e.total) * 100),
              name: file.name,
            });
          }
        });

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const xhrResponse = JSON.parse(xhr.response);
            console.log(xhrResponse.message);
            getHandler();
           res(setStatus("Success"));
          
          }else{
            rej(setStatus("Error"));
          }
        };
        xhr.onerror = function () {
          console.log("Error");
          setStatus("Error")
          
          
        };
        xhr.send(formData);
      });
    } catch (error) {}
  };

  return (
    <>
      <div className="topbar">
        <nav className="navbar">
          <div className="left">
            <button
              type="button"
              className="tpmenb"
              onClick={() => 
                toggleVisible()
              }
            >
              {!isVisible ? (
                <MenuIcon size={size} color={iconColor} />
              ) : (
                <X size={25} color={iconColor} />
              )}
            </button>
            <div className="owner">BengPlayer</div>
          </div>

          <input
            type="file"
            style={{ display: "none" }}
            accept="audio/*"
            multiple
            ref={fileInputRef}
            name="file"
            onChange={handleFileUpload}
          />

          <div className="others">
            <button type="button" className="tpbut" onClick={handleButtonClick}>
              Import files <UploadCloud size={iconsize}></UploadCloud>
            </button>
          </div>
        </nav>
      </div>

      {isModalOpen && (
        <UploadProgress
          status={status}
          uploadState={uploadState}
          onSetModal={(val) => setModalOpen(val)}
        />
      )}
    </>
  );
}
export default Topbar;
