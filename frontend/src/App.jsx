import React from "react";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import NotFound from "./pages/NotFound";
import Home from "./components/Home";
import Courses from "./components/Courses";
import CourseDescription from "./pages/CourseDescription";
import Profile from "./components/Profile";
import Purchase from "./components/Purchase";
import YourCourses from "./components/YourCourses";
import CreateCourse from "./pages/CreateCourse";
import RequireAuth from "./components/Auth/RequireAuth";
import Denied from "./pages/Denied";
import ViewCourseContent from "./components/ViewCourseContent";
import ManageVideo from "./components/ManageVideo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/signin" element={<Signin />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/admin/signin" element={<Signin />} />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/course/description/:courseId"
          element={<CourseDescription />}
        />
        <Route path="/denied" element={<Denied />} />

        <Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
          <Route path="/" element={<Home />} />
          <Route path="/purchases" element={<Purchase />} />
          <Route path="/setting/me" element={<Profile />} />
          <Route path="/:courseId/show/content" element={<ViewCourseContent />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/your/courses" element={<YourCourses />} />
          <Route path="/add/course" element={<CreateCourse />} />
          <Route path="/:courseId/add/content" element={<ManageVideo />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
