import { KeyRoundIcon } from "lucide-react";
import Working from "../../../lib/working";
import { useRef } from "react";
import Form, { FormRef, Input } from "../../../lib/forms";
import { decodeSession, errorHandler } from "../../../lib/utils";
import { useChest } from "../../../app-chest";
import { useVerifiedMutation } from "../../aio-urql";
import { ChestUser } from "../../../lib/types";

const defaultValues = {
  kode: "",
};

const A2b = () => {
  const formRef = useRef<FormRef>(null);
  const { updateChest } = useChest();
  const [{ data, fetching, error }, verified] = useVerifiedMutation();

  if (!error && data) {
    const { verified: user } = data;

    const usr: Partial<ChestUser> = {
      id: user!.id,
      sur: user!.surname,
      fir: user!.firstname,
      las: user!.lastname,
      pic: user!.photoUrl,
      usr: user!.username,
      slg: user!.routeSlugs,
      rut: user!.route.slug || "",
      rol: user!.role,
    };

    localStorage.setItem("token", user?.token || ""); //for apollo client
    updateChest({ type: "session", data: decodeSession(user?.token || "") }); //for early update
    localStorage.setItem("user", JSON.stringify(usr));
    updateChest({ type: "user", data: usr }); //for early update
  } else if (error) {
    errorHandler(error, formRef.current);
  }

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
        onSubmit={(data: any) => {
          verified({
            kode: data.kode,
          });
        }}
      >
        <Input
          name="kode"
          placeholder="Access Code"
          req_msg="code is required"
        />
        <div className="btn text-center">
          <button
            disabled={fetching}
            type="submit"
            className="bg-blue-200 working text-black"
          >
            verify
            <Working loading={fetching} />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default A2b;
