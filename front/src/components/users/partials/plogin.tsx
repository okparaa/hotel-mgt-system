import { useMutation } from "@apollo/client";
import { LockIcon } from "lucide-react";
import { decodeSession, errorHandler } from "../../../lib/utils";
import Form, { Button, FormRef, Input } from "../../../lib/forms";
import { gql } from "../../../__generated__";
import { useRef } from "react";
import { uSession } from "../../../lib/client";

const LOGIN = gql(`
  mutation Signed($user: LoggedUserInput!) {
    signed(user: $user) {
      id
      accessToken
    }
  }
`);

const defaultValues = {
  username: "",
  password: "",
};

const Plogin = () => {
  const formRref = useRef<FormRef>(null);
  const [signed, { data, loading }] = useMutation(LOGIN, {
    onCompleted: ({ signed }) => {
      localStorage.setItem("token", signed?.accessToken || "");
      uSession(decodeSession(signed?.accessToken || ""));
    },
    onError: (error) => {
      errorHandler(error, formRref.current);
    },
  });

  return (
    <>
      <LockIcon className="w-32 h-32 mb-4 border-8 bg-blue-200 p-4 rounded-3xl" />
      <Form
        ref={formRref}
        defaultValues={defaultValues}
        className="flex flex-col items-center w-10/12"
        onSubmit={(data: any) => {
          signed({
            variables: {
              user: data,
            },
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
          <Button status={loading} title="Login" />
        </div>
      </Form>
    </>
  );
};

export default Plogin;
