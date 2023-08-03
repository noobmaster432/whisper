import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [{}, dispatch] = useStateProvider();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const { data } = await axios.get(GET_CONTACTS_ROUTE);
        setContacts(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);
  return (
    <div className="h-full flex flex-col">
      <div className="h-16 flex items-end px-3 py-5">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="text-2xl cursor-pointer"
            onClick={() => dispatch({ type: reducerCases.SET_CONTACTS_PAGE })}
          />
          <span>New Chat</span>
        </div>
      </div>

      <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar">
        <div className="flex py-3 items-center gap-3 mx-4 h-14">
          <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
            <div>
              <BiSearchAlt2 className="text-panel-header-icon text-lg cursor-pointer" />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Contacts"
                className="bg-transparent text-sm focus:outline-none w-full text-white"
              />
            </div>
          </div>
        </div>
        {Object.entries(contacts).map(([initialLetter, userList]) => {
          return (
            <div key={Date.now()+initialLetter}>
              <div className="text-teal-light pl-10 py-5">{initialLetter}</div>
              {
                userList.map((user) => {
                  return (
                    <ChatLIstItem data={user} isContactPage={true} kay={user.id} />
                  )})
              }
            </div>
          )
        })};
      </div>
    </div>
  );
}

export default ContactsList;
