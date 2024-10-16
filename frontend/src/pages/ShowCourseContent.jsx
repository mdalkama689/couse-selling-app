import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ReactPlayer from "react-player";
import axiosInstance from "@/config/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const ShowCourseContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState("");
  const [courseContents, setCourseContents] = useState([]);
  const [currentVideo, setCurrentVideo] = useState("");
  const [showContent, setShowContent] = useState(true);
  const [currentVideoDetails, setCurrentVideoDetails] = useState("");

  const navigate = useNavigate();
  const { courseId } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    const getCoursecontent = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `/course/${courseId}/get/video`
        );

        setCourseContents(response?.data?.courseContents);
        if (response?.data?.courseContents.length == 0) {
          toast({
            description: "No content available for this course!",
            className:
              "bg-gradient-to-r from-red-600 to-red-400 text-white font-semibold p-4 rounded-lg shadow-xl text-center max-w-md mx-auto",
          });

          return;
        }
        const firstVideoOfCourse =
          response?.data?.courseContents[0].video?.secure_url;
        setCurrentVideo(firstVideoOfCourse);
        setCurrentVideoDetails(response?.data?.courseContents[0]);
      } catch (error) {
        console.log(error);

        if (error?.status === 403) {
          toast({
            description:
              "Access denied: Please purchase the course to access its content",
            className:
              "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
          });
          navigate("/");
          return;
        }
        toast({
          description:
            error?.response?.data?.message ||
            "Failed to access  course content!",
          className:
            "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getCoursecontent();
  }, []);

  const handleCurrentVideo = (courseContent) => {
    setCurrentVideo(courseContent?.video?.secure_url);
    setCurrentVideoDetails(courseContent);
  };

  return (
    <div className="mt-24 mb-8">
      {courseContents.length > 0 ? (
        showContent && (
          <div className="fixed top-0 right-0 overflow-y-auto h-[100vh] w-[400px]  z-10 bg-neutral-900 ">
            <h1 className="mt-5 text-white text-center text-3xl font-semibold">
              Course Content
            </h1>
            <div className="h-[1px] mt-4 bg-white"></div>
            <div className="mx-2 mt-1 flex gap-2 px-3 py-5  rounded items-center justify-center flex-col  ">
              {courseContents?.map((courseContent) => (
                <div
                  key={courseContent?._id}
                  className="w-full"
                  onClick={() => handleCurrentVideo(courseContent)}
                >
                  <p
                    className={`flex text-white cursor-pointer items-center ${
                      courseContent?._id === currentVideoDetails?._id
                        ? "bg-neutral-600"
                        : ""
                    } rounded-md p-4 tracking-tight hover:bg-neutral-500 duration-300 text-lg font-medium`}
                  >
                    {courseContent?.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="bg-red-100 text-red-700 border border-red-400 p-4 rounded-lg shadow-md text-center max-w-md mx-auto mt-4">
          <p className="font-semibold text-lg">No content available</p>
          <p className="text-sm">
            It seems there is no video content available at the moment. Please
            check back later.
          </p>
        </div>
      )}
      <div>
        {isLoading && (
          <div className="h-[300px] flex items-center justify-center flex-col">
            <p className="text-lg text-center text-gray-600 py-4">
              Please wait, the course is loading...
            </p>
            <ClipLoader />
          </div>
        )}
        {courseContents.length > 0 && (
          <div className="flex flex-col gap-3">
            <Button
              className="w-fit"
              onClick={() => setShowContent(!showContent)}
            >
              {showContent ? "Hide" : "Show"} Content
            </Button>
            <div>
              <ReactPlayer controls url={currentVideo} />
              <p className="text-lg font-bold mt-3">
                {currentVideoDetails?.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCourseContent;
