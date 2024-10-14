import HomeLayout from "@/components/HomeLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import axiosInstance from "@/config/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CourseDescription = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [courseDetails, setCourseDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = location.state;
  const navigate = useNavigate();

  const purchaseCourse = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`course/purchase/${courseId}`);
      console.log("response : ", response);

      toast({
        description: "Course purchased successfully",
        className:
          "bg-[#28a745] text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
      });

      navigate("/purchases");
    } catch (error) {
      console.log(error); 
      toast({
        description:
          error?.response?.data?.message || "Failed to purchase the course!",
        className:
          "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
      });
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    const getCourseDescription = async () => {
      try {
        const fetchCourse = await axiosInstance.get(
          `/course/description/${courseId}`
        );
        setCourseDetails(fetchCourse?.data?.course);
      } catch (error) {
        toast({
          description: response?.payload || "Signin failed",
          className:
            "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
        });
      }
    };
    getCourseDescription();
  }, []);

  return (
    <HomeLayout>
      <div className="mt-32">
        <div className="bg-[#1058B7]  flex  items-center justify-center py-7 px-5 rounded">
          <h1 className="text-4xl text-center pt-3 font-bold text-white">
            {courseDetails?.title}
          </h1>

          <Card className="w-[50%]" key={courseDetails?._id}>
            <CardHeader>
              <img src={courseDetails?.image?.secure_url} alt="course-img" />
              <CardTitle className="text-start text-lg pt-2 ">
                {courseDetails.title}
              </CardTitle>
              <div className="flex items-center justify-between">
                <CardTitle className=" text-sm font-bold text-gray-900">
                  ₹{courseDetails.price}{" "}
                  <span className="line-through text-gray-400">
                    {courseDetails?.originalPrice}
                  </span>
                </CardTitle>

                <CardTitle className=" text-sm font-bold text-green-400">
                  {courseDetails?.discountInPercentage}%off
                </CardTitle>
              </div>
            </CardHeader>

            <CardFooter className="flex justify-between ">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-[90%] m-auto">Buy Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="font-bold text-xl">
                      Confirm Your Purchase
                    </DialogTitle>
                    <DialogDescription className="font-semibold text-lg">
                      Do you want to purchase the course{" "}
                      <strong>{courseDetails?.title} </strong> for free?
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>

                    {isLoading ? (
                      <Button disabled className=" w-full mt-4 mb-7">
                      <ReloadIcon className="mr-2 h-4 animate-spin " />
                      Please wait
                    </Button>
                    ) : (
                      <Button
                      onClick={purchaseCourse}
                      type="submit"
                      className="w-[90%] m-auto"
                    >
                      Yes, Buy Now
                    </Button>
                    )}
                  
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>

        <div>
          <p className="text-[#1058B7] text-lg font-bold underline cursor-pointer">
            Overview
          </p>

          <p className="text-base font-bold mt-4">Validity : Lifetime</p>

          <div className="mt-5">
            <p className="text-base  font-semibold">
              {courseDetails?.description}
            </p>
            <p className="mt-5 font-bold text-lg">Syllabus</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
