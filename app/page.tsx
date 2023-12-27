import Image from "next/image";
import React from "react";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Eczar } from "next/font/google";
const eczar = Eczar({
  subsets: ["latin"],
  weight: "500",
});
const Home = (props: any) => {
  const bodyBg = () =>
    "mx-auto h-[100vh] bg-gradient-to-br from-[#3d141a] via-[#3d141a] to-[#725b7d]";
  return (
    <div className={`${bodyBg()} ${eczar.className}`}>
      <div className="w-9/12 mx-auto">
        <Navbar />
        <div className="justify-around flex gap-2">
          <div className="box flex flex-1 flex-col items-start justify-center tilt-in-left">
            <p className="text-4xl mb-8 font-extrabold text-blue-200">
              WESTBROOK HOTELS LTD
            </p>
            <p className="leading-7 text-gray-300 text-2xl">
              Quality is never an accident. It is always the result of diligence
            </p>
            <div>
              <button className="text-2xl mt-8 bg-blue-200 mr-6 font-bold border border-gray-600 px-4 py-2 rounded-3xl hover:bg-blue-400">
                Reserve rooms
              </button>
              <button className="text-2xl text-blue-200 mt-8 font-bold border border-gray-600 px-4 py-2 rounded-3xl hover:bg-blue-400 hover:text-black">
                Get in touch
              </button>
            </div>
            <div className="mt-8 flex text-white">
              <PhoneIcon className="w-5 h-5 text-blue-200 m-1" /> 0809-0000-000,
              <EnvelopeIcon className="ml-8 w-6 h-6 mr-1" /> info@westbrook.ng
            </div>
          </div>
          <div className="box">
            <Image
              src="/wstbrka.jpg"
              alt="westbrook"
              width={500}
              height={400}
              className="box rotate-15 border-blue-200 border-4"
            />
          </div>
          <Image
            src="/wstbrki.jpg"
            fill={true}
            alt="background image"
            className="-z-10 opacity-10"
          />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
