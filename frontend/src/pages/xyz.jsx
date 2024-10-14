// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import HomeLayout from "./HomeLayout";
// import { Textarea } from "@/components/ui/textarea";
// import videoSchema from "@/validations/video.schema";
// import { useState } from "react";
// import axiosInstance from "@/config/axiosInstance";

// const YourCourses = () => {
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm({
//     resolver: zodResolver(videoSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       price: "",
//       originalPrice: "",
//       discountInPercentage: "",
//       syllabus: "",
//       courseImage: "",
//     },
//   });

//   const handleThumbnail = (e) => {
//     console.log("heelo");
//     console.log(e);
//     const formData = new FormData();
//     if (e.target.files && e.target.files.length > 0) {
//       formData.append("courseImage", e.target.files[0]);
//     }
//     return formData;
//   };

//   const onSubmit = async (data) => {
//     console.log(data);
//     const response = await axiosInstance.post("/course/create", data);
//     console.log(response);
//   };
//   return (
//     <HomeLayout>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-8 mt-32"
//         >

//           {/*  */}

//           <FormField
//             control={form.control}
//             name="courseImage"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>courseImage</FormLabel>
//                 <FormControl>
//                   <Input
//                   onChange={(e) => {
//                     const formData = handleThumbnail(e)
//                     field.onChange = formData.get('courseImage')
//                   }}
//                   type="file" placeholder="courseImage" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/*  */}
//           {/* <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Course Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Write the title" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Course Description</FormLabel>
//                 <FormControl>
//                   <Textarea placeholder="Write course description" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//             thu
//           />

//           <FormField
//             control={form.control}
//             name="courseImage"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Upload Course Thumbnail</FormLabel>
//                 <FormControl>
//                   <Input
//                     onChange={(e) => {
//                       handleThumbnail(e);
//                       field.onChange(e);
//                     }}
//                     type="file"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="syllabus"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Syllabus</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter the syllabus" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="price"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Price</FormLabel>
//                 <FormControl>
//                   <Input type="number" placeholder="Price" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="originalPrice"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Original Price</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     placeholder="Original Price"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="discountInPercentage"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Discount Percentage</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     placeholder="Discount Percentage"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           /> */}

//           <Button type="submit">Submit</Button>
//         </form>
//       </Form>
//     </HomeLayout>
//   );
// };

// export default YourCourses;
//
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import HomeLayout from "./HomeLayout";
import { Textarea } from "@/components/ui/textarea";
import videoSchema from "@/validations/course.schema";
import { useState } from "react";
import axiosInstance from "@/config/axiosInstance";

const YourCourses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const form = useForm({
    resolver: zodResolver(videoSchema),
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
const [userData, setUserData] = ({
  thumbnail: ""
})
  const handleThumbnail = (e) => {
    const img = e.target.files[0];
    if (img) {
      setUserData({
        ...userData,
        thumbnail: img,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(img);
      fileReader.addEventListener("load", function () {
        setImagePreview(fileReader.result);
      });
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
  
    formData.append("courseImage", userData.thumbnail);

    try {
      console.log(formData)
      const response = await axiosInstance.post("/course/create", formData);
      console.log(response);
    } catch (error) {
      console.error("Error creating course", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HomeLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-32">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input placeholder="Write the title" {...field} />
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
                <FormLabel>Course Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write course description" {...field} />
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
                <FormLabel>Upload Course Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) => {
                      const formData = handleThumbnail(e);
                      field.onChange(formData.get("courseImage")); // Handle file change
                    }}
                    type="file"
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
                <FormLabel>Syllabus</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the syllabus" {...field} />
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
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} />
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
                <FormLabel>Original Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Original Price" {...field} />
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
                <FormLabel>Discount Percentage</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Discount Percentage"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </HomeLayout>
  );
};

export default YourCourses;
