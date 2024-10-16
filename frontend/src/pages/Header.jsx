import { Button } from "@/components/ui/button";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.auth);
  return (
    <div className=" flex items-center justify-between py-2 px-10 shadow-md bg-white fixed top-0 right-0 left-0 z-10">
      <Link to="/" className=" flex items-center justify-start gap-1 ">
        <img
          className=" w-14 h-14"
          src="https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"
          alt="harkirat-photo"
        />
        <p className=" text-blue-900 font-bold text-2xl">100xDevs</p>
      </Link>

      <div className="flex justify-center items-center gap-4">
        {role === "admin" && (
         <div className="flex items-center justify-center gap-4">
         <Link to="/your/courses">
           <Button className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 p-2 rounded-md">
             Your Courses
           </Button>
         </Link>
         <Link to="/add/course">
           <Button className="bg-green-500 text-white hover:bg-green-600 transition duration-300 p-2 rounded-md">
             Add Courses
           </Button>
         </Link>
       </div>
        )}
        {isLoggedIn && (
          <Link to="/purchases">
            {" "}
            <CgProfile size={40} />
          </Link>
        ) }
      </div>

  
    </div>
  );
};

export default Header;
