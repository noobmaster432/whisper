import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

function SearchBar() {
  const [{ contactSearch }, dispatch] = useStateProvider();
  return (
    <div className="bg-search-input-container-background flex py-3 pl-5 items-center gap-3 h-14">
      <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
        <div>
          <BiSearchAlt2 className="text-panel-header-icon text-lg cursor-pointer" />
        </div>
        <div>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent w-full text-sm focus:outline-none text-white"
            value={contactSearch}
            onChange={(e) =>
              dispatch({
                type: reducerCases.SET_CONTACT_SEARCH,
                contactSearch: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="mr-3 p-1.5 cursor-pointer rounded-md hover:bg-background-default-hover">
        <BsFilter className="text-panel-header-icon text-[22px]" />
      </div>
    </div>
  );
}

export default SearchBar;
