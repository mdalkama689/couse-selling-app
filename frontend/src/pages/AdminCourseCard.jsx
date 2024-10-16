import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axiosInstance from "@/config/axiosInstance";
import { useToast } from "@/hooks/use-toast";

const AdminCourseCard = ({ courses }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  let courseId = "";

  const getCourseId = (courseDetails) => {
    courseId = courseDetails?._id;
  };

  const handleDeleteCourse = async (e) => {
    try {
      await axiosInstance.delete(`/course/delete/${courseId}`);

      toast({
        description: "Course delete successfully!",
        className:
          "bg-green-500 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
      });

      setTimeout(() => {
        toast({
          description: "Please refresh the page!",
          className:
          "bg-blue-500 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto"
        });
      }, 2000);
    } catch (error) {
      console.log(error);
      toast({
        description: "Failed to delete course!",
        className:
          "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
      });
    }
  };

  const navigateToAddVideo = (courseDetails) => {
    navigate(`/${courseDetails?._id}/add/content`, {
      state: { courseId: courseDetails?._id },
    });
  };

  return (
    <>
      {courses?.length > 0 ? (
        <>
          {courses?.map((course) => (
            <Card className="w-[30%]  h-auto" key={course?._id}>
              <CardHeader>
                <img src={course?.image?.secure_url} alt="course-img" />
                <CardTitle className="text-start text-lg pt-2 ">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex flex-col justify-between items-center gap-0">
                <Button
                onClick={() => navigateToAddVideo(course)}
                className="w-[90%] bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
                  Add Content
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[90%] mt-2 bg-red-500 text-white hover:bg-red-600 hover:text-white transition duration-300"
                      onClick={() => getCourseId(course)}
                    >
                      Delete Course
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the course and remove all related data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteCourse}
                        className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                      >
                        Delete Course
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-lg text-center font-bold text-gray-600 py-4">
            You don't have any created courses
          </p>
        </div>
      )}
    </>
  );
};

export default AdminCourseCard;
