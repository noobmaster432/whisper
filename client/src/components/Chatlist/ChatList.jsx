import React from "react";
import SearchBar from "./SearchBar";
import ChatListHeader from "./ChatListHeader";
import List from "./List";

function ChatList() {
  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen z-20">
      <>
        <ChatListHeader />
        <SearchBar />
        <List />
      </>
    </div>
  );
}

export default ChatList;
