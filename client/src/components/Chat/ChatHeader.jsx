import React from "react";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function ChatHeader() {
  const [{currentChat}, dispatch] = useStateProvider();

  const handleVoiceCall = () => {
    dispatch({
      type: reducerCases.SET_VOICE_CALL,
      voiceCall: {
        ...currentChat,
        type: "out-going",
        callType: "voice",
        roomId: Date.now(),
      },
    });
  }

  const handleVideoCall = () => {
    dispatch({
      type: reducerCases.SET_VIDEO_CALL,
      videoCall: {
        ...currentChat,
        type: "out-going",
        callType: "video",
        roomId: Date.now(),
      },
    });
  }

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10">
      <div className="flex items-center justify-center gap-4">
        <Avatar type="sm" image={currentChat?.profilePicture} />
        <div className="flex flex-col">
          <span className="text-primary-strong">{currentChat?.name}</span>
          <span className="text-secondary text-sm">offline</span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall onClick={handleVoiceCall} className="text-panel-header-icon text-xl cursor-pointer" />
        <IoVideocam onClick={handleVideoCall} className="text-panel-header-icon text-xl cursor-pointer" />
        <BiSearchAlt2 className="text-panel-header-icon text-xl cursor-pointer" onClick={() => dispatch({ type: reducerCases.SET_MESSAGE_SEARCH })} />
        <BsThreeDotsVertical className="text-panel-header-icon text-xl cursor-pointer" />
      </div>
    </div>
  );
}

export default ChatHeader;
