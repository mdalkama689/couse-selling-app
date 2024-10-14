import React, { useEffect, useState } from "react";
import HomeLayout from "./HomeLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axiosInstance from "@/config/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import PurchaseCourseCard from "@/pages/PurchaseCourseCard";
import { ClipLoader } from "react-spinners";

const Purchase = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [allPurchasedCourses, setAllPurchasedCourses] = useState([]);

  useEffect(() => {
    const getAllPurchaseCourses = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/course/purchases");

        setAllPurchasedCourses(response?.data?.allCourses);
      } catch (error) {
        console.log(error);
        toast({
          description:
            error?.response?.data?.error ||
            "Failed to fetch your purchased courses!",
          className:
            "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getAllPurchaseCourses();
  }, []);
  return (
    <HomeLayout>
      <div className="mt-24">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl">My Purchases</h1>
          <Link to="/courses">
            <Button className="rounded-full">Courses</Button>
          </Link>
        </div>
        <div className="mt-5 flex gap-3 items-center justify-start flex-wrap">
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center flex-col">
              <p className="text-lg text-center text-gray-600 py-4">
                Please wait, your purchased course is being fetched...
              </p>
              <ClipLoader />
            </div>
          ) : (
            <PurchaseCourseCard courses={allPurchasedCourses} />
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Purchase;
