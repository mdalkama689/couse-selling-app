import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa6";
import {  NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaDownload } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { logOutAccount } from "@/redux/slices/authSlice";

import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let apiCall = "user";

  if (role == "user") {
    apiCall = "user";
  } else if (role === "admin") {
    apiCall = "admin";
  }

  const handleLogout = async () => {
    await dispatch(logOutAccount(apiCall));
    navigate("/");
  };

  return (
    <div className=" bg-blue-100 w-[175px] fixed left-0 top-[72px] h-[calc(100%-72px)]">
      <div className=" flex items-center justify-center flex-col pt-10 ">
        <p className=" text-gray-700 font-bold text-xl text-center">
          Main Menu{" "}
        </p>
        <div className="flex items-center justify-center flex-col pt-6 gap-4">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "flex items-center justify-center gap-3  text-[#146fe6]"
                : "flex items-center justify-center gap-3 text-gray-700"
            }
            to="/"
          >
            {" "}
            <IoMdHome size={24} />{" "}
            <span className=" text-lg font-semibold">Home</span>
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive
                ? "flex items-center justify-center gap-3  text-[#146fe6]"
                : "flex items-center justify-center gap-3 text-gray-700"
            }
          >
            {" "}
            <FaGraduationCap size={24} />{" "}
            <span className=" text-lg font-semibold">Courses </span>
          </NavLink>

          <div className="flex items-center justify-center flex-col pt-6 gap-4">
            {isLoggedIn && (
              <>
                <NavLink
                  to="/purchases"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center justify-center gap-3  text-[#146fe6]"
                      : "flex items-center justify-center gap-3 text-gray-700"
                  }
                >
                  {" "}
                  <FaDownload size={24} />{" "}
                  <span className=" text-lg font-semibold">Purchases </span>
                </NavLink>
                <NavLink
                  to="/setting/me"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center justify-center gap-3  text-[#146fe6]"
                      : "flex items-center justify-center gap-3 text-gray-700"
                  }
                >
                  {" "}
                  <IoSettingsOutline size={24} />{" "}
                  <span className=" text-lg font-semibold">Settings </span>
                </NavLink>
                <Button
                  onClick={handleLogout}
                  className="bg-transparent hover:bg-transparent flex items-center justify-center gap-3 text-gray-700"
                >
                  {" "}
                  <MdOutlineLogout size={24} />{" "}
                  <span className=" text-lg font-semibold">Logout </span>
                </Button>
              </>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Sidebar;
