import React from "react";
import { SearchIcon, PlusCircleIcon, HomeIcon } from "@heroicons/react/outline";
const Header = () => {
  return (
    <div className="shadow-sm border-b sticky top-0 bg-gradient-to-tr from-red-200 to-yellow-100">
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        <div className=" hidden  p-5 cursor-pointer relative lg:inline-grid bg-gradient-to-r from-black to-cyan-600 bg-clip-text text-transparent max-sm:hidden text-3xl font-satoshi font-bold italic tracking-wide">
          Moments
        </div>
        <div className="p-5  bg-gradient-to-r from-black to-cyan-600 bg-clip-text text-transparent max-sm:hidden text-3xl font-satoshi font-bold italic tracking-wide cursor-pointer relative  lg:hidden">
          M
        </div>
        <div className="relative mt-1">
          <div className="absolute top-2 left-2">
            <SearchIcon className="h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
          />
        </div>
        <div className="flex space-x-4 items-center">
          <HomeIcon
            // onClick={() => router.push("/")}
            className="text-black hidden md:inline-flex  h-6 cursor-pointer hover:scale-125 transition-tranform duration-200 ease-out"
          />
          <>
            <PlusCircleIcon
              // onClick={() => setOpen(true)}
              className="text-black h-6 cursor-pointer hover:scale-125 transition-tranform duration-200 ease-out"
            />
            <img
              // onClick={onSignOut}
              // src={currentUser?.userImg}
              alt="user-image"
              className="h-10 rounded-full cursor-pointer"
            />
          </>
        </div>
      </div>
    </div>
  );
};

export default Header;
