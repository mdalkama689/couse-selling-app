import React, { useEffect, useState } from "react";
import HomeLayout from "./HomeLayout";

import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import axiosInstance from "@/config/axiosInstance";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
    const {toast} = useToast()

  const [userDetaiils, setUserDetails] = useState([]);
  const { role } = useSelector((state) => state?.auth);


  let apiCall = 'user';

  if (role == "user") {
    apiCall = 'user';
  } else if (role === "admin") {
    apiCall = "admin";
  }

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const fetchUserDetails = await axiosInstance.get(`/${apiCall}/me`);

        setUserDetails(fetchUserDetails?.data?.user)
      } catch (error) {
        console.log(error?.message);
        toast({
          description: "Failed to fetch user details!",
          className:
            "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
        });
      }
    };
    getUserDetails();
  }, []);

  return (
    <HomeLayout>
      <div className="mt-32 mb-10">
        <h1 className="font-semibold text-4xl text-center">Profile </h1>
        <div className="flex items-center justify-center flex-col">
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
            <label htmlFor="fullname" className="font-semibold text-base ">
              Full name
            </label>
            <input
              type="text"
              id="fullname"
              placeholder="fullname"
              readOnly
              value={userDetaiils?.fullName}
              className="cursor-not-allowed focus:outline-none bg-slate-300 rounded-full py-2 px-5"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
            <label htmlFor="email" className="font-semibold text-base ">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="email"
              defaultValue=""
              readOnly
              value={userDetaiils?.email}
              className="cursor-not-allowed focus:outline-none bg-slate-300 rounded-full py-2 px-5"
            />
          </div>
          <Button disabled={true} className="mt-5 cursor-not-allowed ">
            Save Changes
          </Button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Profile;
