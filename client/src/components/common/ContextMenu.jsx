import React, { useEffect, useRef } from "react";

function ContextMenu({ options, coordinates, contextMenu, setContextMenu }) {
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(e.target.id !== "context-opener") {
        if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
          setContextMenu(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  },[]);

  const handleClick = (e, callback) => {
    e.stopPropagation();
    setContextMenu(false);
    callback();
  };
  return (
    <div
      className={`bg-[#191717] fixed px-2 py-2 z-[100] rounded-md shadow-xl`}
      ref={contextMenuRef}
      style={{
        left: coordinates.x,
        top: coordinates.y,
      }}
    >
      <ul>
        {options.map(({ name, callback }) => (
          <li
            key={name}
            onClick={(e) => handleClick(e, callback)}
            className="px-2 py-2 rounded-md cursor-pointer hover:bg-[#111010]"
          >
            <span className="text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
