import axiosInstance from "@/config/axiosInstance";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import CourseCard from "@/pages/CourseCard";
import HomeLayout from "./HomeLayout";
import { ClipLoader } from "react-spinners";

const Courses = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getcourses = async () => {
      setIsLoading(true);
      try {
        const fetchCourses = await axiosInstance.get("/course/all");

        setCourses(fetchCourses?.data?.allCourses);
      } catch (error) {
        console.log(error?.message);
        toast({
          description: "Failed to fetch courses!",
          className:
            "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getcourses();
  }, []);
  return (
    <HomeLayout>
      <h1 className="mt-24 text-center font-bold text-xl my-6">Courses </h1>
      {isLoading ? (
        <div className="h-[300px] flex items-center justify-center flex-col">
          <p className="text-lg text-center text-gray-600 py-4">
            Please wait, the course is loading...
          </p>
          <ClipLoader />
        </div>
      ) : (
        <div className="flex gap-3 items-center justify-center flex-wrap">
          <CourseCard courses={courses} />
        </div>
      )}
    </HomeLayout>
  );
};

export default Courses;
