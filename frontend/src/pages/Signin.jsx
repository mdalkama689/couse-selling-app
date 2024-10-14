import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
import signInSchema from "@/validations/Signin.schema";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { signInAccount } from "@/redux/slices/authSlice";

const Signin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;

  let apiCall = null;
  if (pathname === "/user/signin") {
    apiCall = "user";
  } else if (pathname === "/admin/signin") {
    apiCall = "admin";
  }

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const response = await dispatch(signInAccount([apiCall, data]));

      if (response?.payload?.msg) {
        navigate(`/${apiCall}/signin`);
        navigate("/");
      } else {
        toast({
          description: response?.payload || "Signin failed",
          className:
            "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className=" w-[100vw] h-[100vh]  flex items-center justify-center bg-[#F0FFF0]">
      <div className=" min-w-96 rounded bg-[rgb(255,255,255)]  border border-gray-300 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-3 px-4 ">
        <h1 className=" text-center font-bold text-3xl mt-6 text-gray-800">
          Sign in account{" "}
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-5 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-base ">Email </FormLabel>
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
                  <FormLabel className=" text-base ">Password</FormLabel>
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
              Create an account?{" "}
              <Link to={`/${apiCall}/signup`} className=" text-blue-500">
                Sign up
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
