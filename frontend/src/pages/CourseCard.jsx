import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {  useNavigate } from "react-router-dom";

const CourseCard = ({ courses }) => {
  const navigate = useNavigate();

  const navigateToDescriptionOfCourse = (course) => {
    navigate(`/course/description/${course?._id}`, {state: {courseId: course?._id}})
  };

  return (
    <>
      {courses?.map((course) => (
        <Card
          className="w-[30%]  h-auto"
          key={course?._id}
        
        >
          <CardHeader>
            <img src={course?.image?.secure_url} alt="course-img" />
            <CardTitle className="text-start text-lg pt-2 ">
              {course.title}
            </CardTitle>
            <div className="flex items-center justify-between">
              <CardTitle className=" text-sm font-bold text-gray-900">
                ₹{course.price}{" "}
                <span className="line-through text-gray-400">
                  {course?.originalPrice}
                </span>
              </CardTitle>

              <CardTitle className=" text-sm font-bold text-green-400">
                {course?.discountInPercentage}%off
              </CardTitle>
            </div>
          </CardHeader>
  
          <CardFooter className="flex justify-between ">
          
              <Button
               onClick={() => navigateToDescriptionOfCourse(course)}
              className="w-[90%] m-auto">View Details</Button>
     
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default CourseCard;
