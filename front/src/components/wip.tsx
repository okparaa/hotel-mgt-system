import { WorkflowIcon } from "lucide-react";
import Navbar from "../lib/navbar";
import SideColBar from "../lib/sidebar";
import { useParams } from "react-router-dom";

const NoMatch = () => {
  const params = useParams();
  const loc = params["*"];

  return (
    <div className="w-11/12 mx-auto">
      <div className="mr-2">
        <Navbar />
      </div>
      <SideColBar />
      <div className="flex flex-col h-80 flex-1 justify-center items-center">
        <WorkflowIcon className="w-32 h-32 mb-4 border-8 bg-blue-200 p-4 rounded-3xl" />
        <div className="font-extrabold text-4xl">work in progress</div>
        <div>[{loc}]</div>
      </div>
    </div>
  );
};

export default NoMatch;
