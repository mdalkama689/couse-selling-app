import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import signUpSchema from "@/validations/Signup.schema";
import { useDispatch } from "react-redux";
import { signUpAccount } from "@/redux/slices/authSlice";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const pathname = location.pathname;

  let apiCall = null;
  if (pathname === "/user/signup") {
    apiCall = "user";
  } else if (pathname === "/admin/signup") {
    apiCall = "admin";
  }

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await dispatch(signUpAccount([apiCall, data]));

      if (response?.payload?.msg) {
        navigate(`/${apiCall}/signin`);
      }
    } catch (error) {
      toast({
        description:  "Signup failed",
        className:
          "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
      });
    
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-[100vw] h-[100vh]  flex items-center justify-center bg-[#F0FFF0]">
      <div className=" min-w-96 rounded bg-[rgb(255,255,255)] border border-gray-300 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-3 px-4 ">
        <h1 className=" text-center font-bold text-3xl mt-6 text-gray-800">
          Create your account{" "}
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-base">Fullname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-base">Email </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter you email address"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-base">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {isLoading ? (
              <Button disabled className=" w-full mt-4 mb-7">
                <ReloadIcon className="mr-2 h-4 animate-spin " />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className=" w-full mt-4 mb-7">
                Signup
              </Button>
            )}

            <p className=" text-center text-black">
              Already have an account?{" "}
              <Link to={`/${apiCall}/signin`} className=" text-blue-500">
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
