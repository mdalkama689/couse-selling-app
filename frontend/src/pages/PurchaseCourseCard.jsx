import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useNavigate } from "react-router-dom";

const PurchaseCourseCard = ({ courses }) => {

  const navigate = useNavigate()

  const navigateToCourseContent = (course) => {
navigate(`/${course?._id}/show/content`)
  }
  return (
    <>
      { courses?.length > 0 ? (
        <>
          {courses?.map((course) => (
            <Card className="w-[30%]  h-auto" key={course?._id}>
              <CardHeader>
                <img src={course?.image?.secure_url} alt="course-img" />
                <CardTitle className="text-start text-lg pt-2 ">
                  {course?.title}
                </CardTitle>
              </CardHeader>

              <CardFooter className="flex justify-between ">
                <Button
                onClick={() => navigateToCourseContent(course)}
                className="w-[90%] m-auto">View</Button>
              </CardFooter>
            </Card>
          ))}
        </>
      ) : (
      <div className="h-[300px] flex items-center justify-center">
          <p className="text-lg text-center font-bold text-gray-600 py-4">
          You don't have any purchased courses.
        </p>
      </div>
      )}
    </>
  );
};

export default PurchaseCourseCard;
