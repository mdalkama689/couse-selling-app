import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import axiosInstance from "@/config/axiosInstance";
import HomeLayout from "@/components/HomeLayout";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import videoSchema from "@/validations/video.schema";

const AddVideo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const form = useForm({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      title: "",
      courseVideo: "",
    },
  });

  useEffect(() => {
    const getCourseDescription = async () => {
      try {
        const response = await axiosInstance.get(
          `/course/description/${courseId}`
        );
        console.log(response);
        setTitle(response?.data?.course?.title);
      } catch (error) {
        toast({
          description: "Something went wrong!",
          className:
            "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
        });
      }
    };
    getCourseDescription();
  }, []);

  const handleThumbnail = (e) => {
    setVideo(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("video", video);
      await axiosInstance.post(`/course/add/video/${courseId}`, formData);

      toast({
        description: "Add content successfully!",
        className:
          "bg-green-500 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        description: "Failed to add content!",
        className:
          "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mt-28 ">
        <h1 className="text-start font-bold text-3xl mt-6 text-gray-800">
          Add content to <span className="text-blue-600">{title}</span>
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 space-y-4 mb-5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter video title"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Course Content</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChangeCapture={handleThumbnail}
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isLoading ? (
              <Button disabled className="w-full mt-4 ">
                <ReloadIcon className="mr-2 h-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-4 ">
                Add content
              </Button>
            )}
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddVideo;
