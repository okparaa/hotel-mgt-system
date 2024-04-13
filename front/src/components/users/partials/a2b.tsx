import { useLazyQuery } from "@apollo/client";
import { KeyRoundIcon } from "lucide-react";
import Working from "../../../lib/working";
import { useRef } from "react";
import Form, { FormRef, Input } from "../../../lib/forms";
import { decodeSession, errorHandler } from "../../../lib/utils";
import { curUser, uSession } from "../../../lib/client";
import { ACCESS_KODE } from "../../queries/users-queries";

const defaultValues = {
  kode: "",
};

const A2b = () => {
  const formRef = useRef<FormRef>(null);
  const [verified, { loading }] = useLazyQuery(ACCESS_KODE, {
    onError: (error) => {
      errorHandler(error, formRef.current);
    },
    onCompleted: ({ verified: user }) => {
      const usr: any = {
        id: user?.id,
        sur: user?.surname,
        fir: user?.firstname,
        las: user?.lastname,
        pic: user?.photoUrl,
        usr: user?.username,
        slg: user?.userSlug,
        rut: user?.routeSlugs,
      };

      localStorage.setItem("token", user?.token || ""); //for apollo client
      uSession(decodeSession(user?.token || "")); //for early update
      localStorage.setItem("user", JSON.stringify(usr));
      curUser(usr); //for early update
    },
  });

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <KeyRoundIcon className="w-32 h-32 mb-4 border-8 bg-blue-200 p-4 rounded-3xl" />
      <div className="px-8 pb-2 text-center text-md font-bold">
        Enter the access code
      </div>
      <Form
        ref={formRef}
        defaultValues={defaultValues}
        className="flex flex-col items-center"
        onSubmit={(data: any) =>
          verified({
            variables: {
              kode: data.kode,
            },
          })
        }
      >
        <Input
          name="kode"
          placeholder="Access Code"
          req_msg="code is required"
        />
        <div className="btn text-center">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-200 working text-black"
          >
            verify
            <Working loading={loading} />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default A2b;
