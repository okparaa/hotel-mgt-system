import { Link, Navigate } from "react-router-dom";
import wstbrke from "../../images/wstbrke.jpg";
import { Image } from "../../lib/image";
import Plogin from "./partials/plogin";
import A2b from "./partials/a2b";
import { useChest } from "../../app-chest";

const Login = () => {
  const {
    data: { session },
  } = useChest();

  if (session.auth === "ok") {
    return <Navigate to="/aio" />;
  }
  return (
    <div className="main">
      <div className="p-8 flex-1 text-[20px] flex flex-col justify-center bg-gradient-to-tr from-blue-100 via-transparent">
        <p>
          A hotel should relieve travelers of their insecurity and loneliness.
          It should make them feel warm and cozy.
        </p>
        <Image
          src={wstbrke}
          alt="westbrook room"
          className="border-8 rounded-ss-[150px] rounded-ee-[150px]"
        />
      </div>
      <div className="flex flex-col flex-1 justify-center items-center bg-gradient-to-tr from-transparent via-transparent to-blue-100 py-4">
        {session.auth === "in" ? (
          <A2b />
        ) : session.auth === "" ? (
          <Plogin />
        ) : (
          ""
        )}
        {session.auth == "" && (
          <div>
            <span>Don't have account? </span>
            <Link to="/users/signup" className="link">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
