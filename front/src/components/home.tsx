import { MailIcon, PhoneIcon } from "lucide-react";
import { Image } from "../lib/image";
import Navbar from "../lib/navbar";
import wstbrka from "../images/wstbrka.jpg";
import { useQuery } from "@apollo/client";
import { GET_ROUTES } from "./queries/routes-queries";
const Home = () => {
  useQuery(GET_ROUTES);
  return (
    <div className="home">
      <div className="flex flex-col justify-center w-10/12 mx-auto">
        <Navbar />
        <div className="flex mt-10 justify-center p-3">
          <div className="flex flex-1 flex-col justify-center tilt-in-left">
            <p className="text-4xl mb-8 font-extrabold text-fuchsia-900">
              WESTBROOK HOTELS LTD
            </p>
            <p className="leading-7 text-black text-2xl">
              Unpack once and experience multiple exquisite places prepared just
              for you.
            </p>
            <div>
              <button className="text-2xl mt-8 bg-fuchsia-900 mr-6 font-bold border border-gray-600 px-4 py-1 rounded-3xl hover:bg-fuchsia-800 text-white">
                Get a room
              </button>
              <button className="text-2xl text-fuchsia-900 mt-8 font-bold border border-gray-600 px-4 py-1 rounded-3xl hover:bg-fuchsia-900 hover:text-white">
                Get in touch
              </button>
            </div>
            <div className="mt-8 flex text-black">
              <PhoneIcon className="w-5 h-5 text-black m-1" /> 0809-0000-000,
              <MailIcon className="ml-8 w-6 h-6 mr-1" /> info@westbrook.ng
            </div>
          </div>
          <div className="flex-1">
            <Image
              src={wstbrka}
              alt="westbrook"
              className="box p-2 rotate-15 border-blue-200 border-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
