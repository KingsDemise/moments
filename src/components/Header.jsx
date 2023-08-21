import React from "react";
import { PlusCircleIcon, HomeIcon } from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { modalState } from "../../atom/modalAtom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  return (
    <div className="shadow-sm border-b sticky top-0 bg-gradient-to-tr from-red-200 to-yellow-100">
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        <div
          onClick={() => router.push("/")}
          className=" hidden  p-5 cursor-pointer relative lg:inline-grid bg-gradient-to-r from-black to-cyan-600 bg-clip-text text-transparent max-sm:hidden text-3xl font-satoshi font-bold italic tracking-wide"
        >
          Moments
        </div>
        <div
          onClick={() => router.push("/")}
          className="p-5  bg-gradient-to-r from-black to-cyan-600 bg-clip-text text-transparent max-sm:hidden text-3xl font-satoshi font-bold italic tracking-wide cursor-pointer relative  lg:hidden"
        >
          M
        </div>

        <div className="flex space-x-4 items-center">
          <HomeIcon
            onClick={() => router.push("/")}
            className="text-black hidden md:inline-flex  h-6 cursor-pointer hover:scale-125 transition-tranform duration-200 ease-out"
          />
          <>
            {session ? (
              <>
                <PlusCircleIcon
                  onClick={() => setOpen(true)}
                  className="text-black h-6 cursor-pointer hover:scale-125 transition-tranform duration-200 ease-out"
                />
                <img
                  onClick={signOut}
                  src={session.user.image}
                  alt="user-image"
                  className="h-10 rounded-full cursor-pointer"
                />
              </>
            ) : (
              <button
                className="text-blue-500 h-6 cursor-pointer hover:scale-110 transition-tranform duration-200 ease-out"
                onClick={signIn}
              >
                Sign in
              </button>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Header;
