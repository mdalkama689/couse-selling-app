import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import courseSchema from "@/validations/course.schema";

const CreateCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      originalPrice: "",
      discountInPercentage: "",
      syllabus: "",
      courseImage: "",
    },
  });

  const handleThumbnail = (e) => {
    setThumbnail(e.target.files[0]);
    console.log(typeof e.target.files[0]);
  };
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("originalPrice", data.originalPrice);
      formData.append("discountInPercentage", data.discountInPercentage);
      formData.append("syllabus", data.syllabus);
      formData.append("courseImage", thumbnail);
      await axiosInstance.post("/course/create", formData);

      toast({
        description: "Course created successfully!",
        className:
          "bg-green-500 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
      });
      navigate("/your/courses");
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

  return (
    <HomeLayout>
      <div className="mt-28 ">
        <h1 className="text-start font-bold text-3xl mt-6 text-gray-800">
          Create a Course
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
                      placeholder="Enter course title"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter course description"
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
              name="courseImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Course image </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChangeCapture={handleThumbnail}
                      placeholder="Enter course image"
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
              name="syllabus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Syllabus</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter syllabus"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter course price"
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
              name="originalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Original Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter original price"
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
              name="discountInPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Discount (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter discount percentage"
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
                Create Course
              </Button>
            )}
          </form>
        </Form>
      </div>
    </HomeLayout>
  );
};

export default CreateCourse;
