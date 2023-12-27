import React from "react";

const Cards = () => (
  <div className="justify-around flex bg-transparent gap-6">
    <div className="box-shadow flex-1 flex flex-col items-center px-8 py-10 bg-white rounded-3xl">
      <p className="text-2xl font-extrabold text-dark-grey-900">Email</p>
      <p className="text-base leading-7 text-dark-grey-600">Contact us at</p>
      <a
        className="text-lg font-bold text-purple-blue-500"
        href="mailto: hello@loopple.com"
      >
        hello@loopple.com
      </a>
    </div>
    <div className="box-shadow flex flex-1 flex-col items-center px-8 py-10 bg-white rounded-3xl">
      <p className="text-2xl font-extrabold text-dark-grey-900">Phone</p>
      <p className="text-base leading-7 text-dark-grey-600">
        Reach out to us by phone
      </p>
      <a
        className="text-lg font-bold text-purple-blue-500"
        href="tel:+516-486-5135"
      >
        +516-486-5135
      </a>
    </div>
    <div className="box-shadow flex flex-1 flex-col items-center px-8 py-10 bg-white rounded-3xl">
      <p className="text-2xl font-extrabold text-dark-grey-900">Location</p>
      <p className="text-base leading-7 text-dark-grey-600">
        Find us at our office
      </p>
      <a
        className="text-lg font-bold text-purple-blue-500"
        target="_blank"
        href="https://goo.gl/maps/QcWzYETAh4FS3KTD7"
      >
        10924 Urna Convallis
      </a>
    </div>
  </div>
);

export default Cards;
