import { LockIcon } from "lucide-react";
import Form, { Button, FormRef, Input } from "../../../lib/forms";
import { useRef } from "react";
import { decodeSession, errorHandler } from "../../../lib/utils";
import { useChest } from "../../../app-chest";
import { useLoginMutation } from "../../aio-urql";

const defaultValues = {
  username: "",
  password: "",
};

const Plogin = () => {
  const formRref = useRef<FormRef>(null);
  const [{ data, fetching, error }, signed] = useLoginMutation();
  const { updateChest } = useChest();
  if (!error && data) {
    const { signed } = data;
    localStorage.setItem("token", signed?.accessToken || "");
    const sess = decodeSession(signed?.accessToken || "");

    updateChest({ data: sess, type: "session" }); //just to update app state
  } else if (error) {
    errorHandler(error, formRref.current);
  }

  return (
    <>
      <LockIcon className="w-32 h-32 mb-4 border-8 bg-blue-200 p-4 rounded-3xl" />
      <Form
        ref={formRref}
        defaultValues={defaultValues}
        className="flex flex-col items-center w-10/12"
        onSubmit={(data: any) => {
          signed({
            user: data,
          });
        }}
      >
        <Input
          name="username"
          placeholder="Username"
          req_msg="username is required"
          email_msg="must be a valid email"
        />
        <Input
          name="password"
          placeholder="Password"
          req_msg="password is required"
          type="password"
        />
        <div>
          {data && data.signed && !data.signed.accessToken && (
            <span>invalid username or password</span>
          )}
        </div>
        <div className="btn mb-4">
          <Button status={fetching} title="Login" />
        </div>
      </Form>
    </>
  );
};

export default Plogin;
