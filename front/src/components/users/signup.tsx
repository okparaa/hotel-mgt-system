import { useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Avatar from "../../lib/avatar";
import Form, { Button, FormRef, Input } from "../../lib/forms";
import { errorHandler, image64ToBlob, uploadImage } from "../../lib/utils";
import { useNewUserMutation } from "../aio-urql";

const SignUp = () => {
  const formRef = useRef<FormRef>(null);
  const navigate = useNavigate();
  const [{ data, fetching, error }, createUser] = useNewUserMutation();

  if (!error && data) {
    return <Navigate to={`/users/login`} />;
  } else if (error) {
    errorHandler(error, formRef.current);
  }
  const defaultValues = {
    username: "",
    password: "",
    password2: "",
    phone: "",
    address: "",
    firstname: "",
    lastname: "",
    surname: "",
  };

  const avatarUrl = useRef<string | null>(null);

  const updateAvatar = (imgSrc: string) => {
    avatarUrl.current = imgSrc;
  };

  return (
    <div className="main">
      <div className="p-8 w-1/3 text-[20px] flex flex-col bg-gradient-to-tr from-blue-100 via-transparen to-transparent">
        <p className="font-bold text-2xl">
          A hotel should relieve travelers of their insecurity and loneliness.
          It should make them feel warm and cozy.
        </p>
      </div>
      <div className="bg-gradient-to-tr from-transparent via-transparent to-blue-100 flex flex-col flex-1 justify-center items-center pl-1 py-4">
        <Form
          ref={formRef}
          defaultValues={defaultValues}
          onSubmit={async (data: any) => {
            try {
              const resp = await createUser({
                user: data,
              });
              if (resp.data && resp.data.newUser && avatarUrl.current) {
                const formData = new FormData();
                formData.append("model", "users");
                formData.append("id", resp.data?.newUser?.id);
                formData.append("field", "photo_url");
                const file = image64ToBlob(avatarUrl.current);
                formData.append("file", file);
                await uploadImage(formData);
                return navigate("/users/login");
              } else {
                //console.log("something went wrong", resp);
              }
            } catch (error) {
              //console.log(error);
            }
          }}
          className="w-10/12"
        >
          <div>
            <Avatar updateAvatar={updateAvatar} avatarUrl={avatarUrl} />
          </div>
          <Input
            req_msg="required"
            name="firstname"
            placeholder="First Name"
            size="w-9/12"
          />
          <Input
            req_msg="required"
            name="lastname"
            placeholder="Last Name"
            size="w-9/12"
          />
          <Input
            req_msg="required"
            name="surname"
            placeholder="Surname"
            size="w-9/12"
          />
          <Input
            name="username"
            req_msg="required"
            email_msg="invalid email"
            size="w-10/12"
            placeholder="Username"
          />
          <Input
            req_msg="required"
            name="password"
            placeholder="Password"
            size="w-8/12"
            type="password"
            autoComplete=""
          />
          <Input
            req_msg="required"
            name="password2"
            placeholder="Confirm password"
            size="w-8/12"
            type="password"
            autoComplete=""
          />
          <Input
            name="phone"
            req_msg="required"
            phone_msg="invalid phone number"
            placeholder="Phone"
            size="w-6/12"
          />
          <Input
            req_msg="required"
            name="address"
            placeholder="Address"
            size="w-10/12"
          />
          <div className="btn mb-4">
            <Button status={fetching} title="Join" />
          </div>
        </Form>
        <div className="w-10/12">
          <span>Already have an account? </span>
          <Link to="/users/login" className="link bg-slate-100">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
