import Footer from "@/pages/Footer";
import Header from "@/pages/Header";
import Sidebar from "@/pages/Sidebar";
import React from "react";


const HomeLayout = ({ children }) => {


  return (
    <div className=" overflow-x-hidden bg-transparent ">
      <Header />
      <Sidebar />
      <main className="ml-[175px] px-10">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default HomeLayout;
