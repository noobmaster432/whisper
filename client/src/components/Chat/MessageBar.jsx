import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

function MessageBar() {
  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile title="Emoji" className="text-panel-header-icon text-xl cursor-pointer" />
          <ImAttachment title="Attach file" className="text-panel-header-icon text-xl cursor-pointer" />
        </div>
        <div className="w-full rounded-lg h-10 flex items-center">
          <input type="text" placeholder="Type a message" className="bg-input-background text-sm focus:outline-none w-full text-white h-10 rounded-lg px-5 py-4 w-full" />
        </div>
        <div className="flex w-10 items-center justify-center">
          <button className="bg-primary rounded-full w-10 h-10 flex items-center justify-center">
            <MdSend title="Send Message" className="text-panel-header-icon text-xl cursor-pointer" />
            {/* <FaMicrophone title="Record" className="text-panel-header-icon text-xl cursor-pointer" /> */}
          </button>
        </div>
      </>
    </div>
  );
}

export default MessageBar;
