import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";

function ChatListHeader() {
  const [{userInfo}, dispatch] = useStateProvider();
  return <div className="h-16 px-4 py-3 flex justify-between items-center">
    <div className="cursor-pointer">
      <Avatar type="sm" image={userInfo?.profileImage} />
    </div>
    <div className="flex gap-6">
      <BsFillChatLeftTextFill title="New Chat" className="text-panel-header-icon text-xl cursor-pointer" />
      <>
        <BsThreeDotsVertical title="Menu" className="text-panel-header-icon text-xl cursor-pointer" />
      </>
    </div>
  </div>;
}

export default ChatListHeader;
