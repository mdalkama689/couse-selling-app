import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <div className=" rounded-xl mb-10 pb-10 flex items-start pt-10 justify-between px-10 bg-blue-200">
        <img
          className=" w-24 h-24 rounded-full"
          src="https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"
          alt="harkirat-photo"
        />

        <div>
          <p className=" font-bold">Quick Links</p>
          <div className=" flex items-start flex-col mt-2 gap-1">
            <Link to="/terms" className=" text-blue-500 underline">
              {" "}
              Terms & Conditions
            </Link>
            <Link to="/privacy-policy" className=" text-blue-500 underline">
              {" "}
              Privacy Policy
            </Link>
            <Link to="/refund-policy" className=" text-blue-500 underline">
              {" "}
              Refunds & Cancellation Policy
            </Link>
          </div>
        </div>

        <div className=" flex  flex-col items-start ">
          <div className=" flex items-start  flex-col">
            <p className="font-bold">Download App</p>
            <img
              className=" h-16 "
              src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
              alt=""
            />
          </div>
          <p className="font-bold">Follow us</p>
          <div className=" flex items-center justify-center gap-3 mt-2">
            <Link to="/">
              <FaXTwitter size={24} />{" "}
            </Link>
            <Link to="/">
              <FaLocationDot size={24} />{" "}
            </Link>
            <Link to="/">
              <FaYoutube size={24} />{" "}
            </Link>
            <Link to="/">
              <FaInstagram size={24} />{" "}
            </Link>
          </div>
          <div className="inline-flex items-center">
            <span className="font-normal">
              Powered by{" "}
              <Link to="https://teachcode.in/">
                {" "}
                <img
                  className="h-5 inline-block"
                  src="https://teachcode.in/logos/teachcode-logo.png"
                  alt="teachcode"
                />
              </Link>{" "}
            </span>
          </div>
          <div></div>
        </div>
      </div>
      <p className="text-center font-semibold ">
        {" "}
        © {new Date().getFullYear()} TeachCode. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
