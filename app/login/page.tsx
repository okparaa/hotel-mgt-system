"use client";

import { LockClosedIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "next/link";
import Input from "@/components/Input";

const Login = (props: any) => {
  const initialValues: any = {
    username: "",
    password: "",
  };
  const LoginSchema = yup.object({
    username: yup
      .string()
      .email("invalid email")
      .required("username is required"),
    password: yup.string().required("password is required"),
  });
  const xPost = (values: any, actions: any) => {
    console.log(values);
    console.log(actions);
  };
  const inputClass = (width: string) => `primary peer ${width}`;
  const labelClass = () =>
    "primary peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1";

  return (
    <Layout>
      <div className="main">
        <div className="p-8 flex-1 text-[20px] flex flex-col justify-center bg-gradient-to-tr from-blue-100 via-transparent">
          <p>
            A hotel should relieve travelers of their insecurity and loneliness.
            It should make them feel warm and cozy.
          </p>
          <Image
            src="/wstbrke.jpg"
            alt="westbrook room"
            width={500}
            height={500}
            objectFit="contain"
            className="border-8 rounded-ss-[150px] rounded-ee-[150px]"
          />
        </div>
        <div className="flex flex-col flex-1 justify-start items-center bg-gradient-to-tr from-transparent via-transparent to-blue-100 py-4">
          <LockClosedIcon className="w-32 h-32 mb-4 border-8 bg-blue-200 p-4 rounded-full" />
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={xPost}
          >
            {(props) => (
              <Form className="flex flex-col items-center form">
                <Input
                  errorContainer="div"
                  inputClass={inputClass("w-[90%]")}
                  labelClass={labelClass()}
                  name="username"
                  placeholder="Username"
                  {...props}
                />
                <Input
                  errorContainer="div"
                  inputClass={inputClass("w-[90%]")}
                  labelClass={labelClass()}
                  name="password"
                  placeholder="Password"
                  type="password"
                  {...props}
                />
                <button type="submit" className="bg-blue-200 text-black">
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-4">
            <span>Don't have account? </span>
            <Link href="/signup" className="link">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
