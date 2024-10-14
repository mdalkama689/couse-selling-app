import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-[#e8ddff] to-[#e1b991] mb-6 rounded p-5 text-base font-semibold">
      <p> Welcome to 100xdevs.</p>
      <p className="mt-3">
        {" "}
        This is an initiative by{" "}
        <span className="font-bold">Harkirat Singh</span> to personally mentor
        folks in the field of Programming.
      </p>
      <p className="mt-3">
        {" "}
        Harkirat strongly feels that today you are either a 1x engineer or a
        100x engineer and nothing in the middle, and his hope is to <br /> take
        everyone in this community to be a 100x Engineer.
      </p>
      <p className="mt-3">
        {" "}
        Join him in his first course on Full Stack development with a heavy
        focus on Open source projects to learn programming practically.
      </p>
    </div>
  );
};

export default About;
