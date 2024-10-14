import HomeLayout from "@/components/HomeLayout";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import videoSchema from "@/validations/video.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "postcss";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, useLocation } from "react-router-dom";

const AddVideo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState("");

const location = useLocation()
const {courseId} = location.state


  const form = useForm({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      title: "",
      courseVideo: "",
    },
  });

  const handleVideo = (e) => {
    console.log("e.target.files[0] : ", e.target.files[0]);

    setVideoPreview(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("video", videoPreview);
      //  await axiosInstance.post("/course/create", formData);

      toast({
        description: "Course created successfully!",
        className:
          "bg-green-500 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
      });
      // navigate("/your/courses");
    } catch (error) {
      console.error(error);
      toast({
        description: "Failed to create course!",
        className:
          "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
      });
    } finally {
      setIsLoading(false);
    }
  };

  
  // {isLoading ? (
  //   <Button disabled className="w-full mt-4 ">
  //     <ReloadIcon className="mr-2 h-4 animate-spin" />
  //     Please wait
  //   </Button>
  // ) : (
  //   <Button type="submit" className="w-full mt-4 ">
  //     Create Course
  //   </Button>
  // )}
  return (
    <HomeLayout>
     <div className="mt-32">
<video src="https://res.cloudinary.com/dsxerjghj/video/upload/v1728902660/course-s…"></video>
     </div>
        </HomeLayout>
  );
};

export default AddVideo;
