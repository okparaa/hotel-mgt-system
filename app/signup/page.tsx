"use client";

import Layout from "@/components/Layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($user: createUserInput!) {
    createUser(user: $user) {
      id
      surname
      firstname
      lastname
      phone
      address
      email
      active
      username
      photo_url
      hashedPassword
      createdAt
      updatedAt
    }
  }
`;

const SignUp = () => {
  const [k8User, { data, loading, error }] = useMutation(CREATE_USER);

  const xPost = (values: any, actions: any) => {
    k8User({ variables: { user: values } });
  };

  const initialValues: any = {
    username: "",
    password: "",
    password_verify: "",
    phone: "",
    email: "",
    address: "",
    firstname: "",
    lastname: "",
    surname: "",
  };

  const phoneRegx =
    /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

  const SignUpSchema = yup.object({
    username: yup.string().required("username is required"),
    password: yup.string().required("password is required"),
    email: yup.string().email("Invalid email").required("email is required"),
    password_verify: yup
      .string()
      .label("confirm password")
      .required("confirmation password is required")
      .oneOf([yup.ref("password")], "passwords must match"),
    phone: yup
      .string()
      .matches(phoneRegx, "Invalid phone number")
      .required("phone number is required"),
    address: yup.string().required("address is required"),
    firstname: yup.string().required("firstname is required"),
    lastname: yup.string().required("lastname is required"),
    surname: yup.string().required("surname is required"),
  });

  const [modalOpen, setModalOpen] = useState(false);
  const avatarUrl = useRef("/user_photo.png");

  const updateAvatar = (imgSrc: string) => {
    avatarUrl.current = imgSrc;
  };

  const inputClass = (width: string) => `primary peer ${width}`;
  const labelClass = () =>
    "primary peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1";

  return (
    <Layout>
      <div className="main">
        <div className="p-8 w-1/3 text-[20px] flex flex-col bg-gradient-to-tr from-blue-100 via-transparen to-transparent">
          <p>
            A hotel should relieve travelers of their insecurity and loneliness.
            It should make them feel warm and cozy.
          </p>
        </div>
        <div className="bg-gradient-to-tr from-transparent via-transparent to-blue-100 flex flex-col flex-1 justify-start pl-1 py-4">
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={xPost}
          >
            {(props) => (
              <Form className="flex flex-col w-[90%] form ml-10">
                <div>
                  <Avatar updateAvatar={updateAvatar} avatarUrl={avatarUrl} />
                </div>
                <Input
                  errorContainer="div"
                  inputClass={inputClass("w-[60%]")}
                  labelClass={labelClass()}
                  name="firstname"
                  placeholder="firstname"
                  {...props}
                />
                <Input
                  errorContainer="div"
                  inputClass={inputClass("w-[60%]")}
                  labelClass={labelClass()}
                  name="lastname"
                  placeholder="lastname"
                  {...props}
                />
                <Input
                  errorContainer="div"
                  inputClass={inputClass("w-[60%]")}
                  labelClass={labelClass()}
                  name="surname"
                  placeholder="surname"
                  {...props}
                />
                <Input
                  errorContainer="div"
                  inputClass={inputClass("w-[70%]")}
                  labelClass={labelClass()}
                  name="username"
                  placeholder="Username"
                  {...props}
                />
                <Input
                  errorContainer="div"
                  inputClass={inputClass("w-[50%]")}
                  labelClass={labelClass()}
                  name="password"
                  placeholder="Password"
                  type="password"
                  {...props}
                />
                <Input
                  errorContainer="div"
                  inputClass={inputClass("w-[50%]")}
                  labelClass={labelClass()}
                  name="password_verify"
                  placeholder="Confirm Password"
                  type="password"
                  {...props}
                />
                <Input
                  errorContainer="div"
                  inputClass={inputClass("w-[60%]")}
                  labelClass={labelClass()}
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  {...props}
                />
                <Input
                  errorContainer="div"
                  inputClass={inputClass("w-[40%]")}
                  labelClass={labelClass()}
                  name="phone"
                  placeholder="Phone Number"
                  type="phone"
                  {...props}
                />
                <Input
                  errorContainer="div"
                  inputClass={inputClass("w-[90%]")}
                  labelClass={labelClass()}
                  name="address"
                  placeholder="Home Address"
                  {...props}
                />

                <div className="mb-4 h-12">
                  <button
                    type="submit"
                    className="bg-blue-200 w-2/6 text-black"
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="mt-4">
            <span>Already have an account? </span>
            <Link href="/login" className="link bg-slate-100">
              Login
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
