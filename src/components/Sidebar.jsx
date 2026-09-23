import { ListVideo, PlayCircle } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {useEffect, useRef, useState} from 'react'
import { useSharedData } from "./BarContext";

// import Player from "./Player";


export default function Sidebar() {
  const myLocation = useLocation();
  const sideBarRef = useRef(null);
  let currentPath = myLocation.pathname
  let iconColor = "black";
let size = 35;

const {isVisible, setVisible} = useSharedData()

useEffect(() => {
    function handleClickOutside(event) {
      // Check if sidebar is open AND if the clicked element is NOT inside the sidebar
      if (isVisible && sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setVisible(false); // Close the sidebar
      }
    }

    // Attach listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, setVisible]);

  return (
    <>
      <div className={(isVisible) ? "sidebar" : "sidebar disp"} ref={sideBarRef}>
        <ul id="list" className="list">
          <li>
            <NavLink to="/playlist" className={currentPath == "/playlist" ? "navlinkStyle navActive" : "navlinkStyle "}>
              <ListVideo color={iconColor} size={size}></ListVideo>
              View PlayList
            </NavLink>
          </li>
          <li>
            <NavLink to="/playing" className={currentPath == "/playing" ? "navlinkStyle navActive" : "navlinkStyle"}>
              <PlayCircle color={iconColor} size={size} />
              Now Playing
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
