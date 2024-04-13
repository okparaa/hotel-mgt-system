import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { Image } from "./image";
import { X } from "lucide-react";
import ImageCropper from "./image-cropper";

const Avatar = ({ avatarUrl, updateAvatar, imageUrl }: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log(imageUrl);

  return (
    <div className="flex flex-col items-start">
      <div className="relative pb-4 flex justify-center w-full">
        {typeof imageUrl == "string" ? (
          <div
            onClick={() => setModalOpen(true)}
            style={{ backgroundImage: `url(${imageUrl})` }}
            className="block cursor-pointer rounded-full shadow-xl mx-auto -mt-16 h-28 w-28 bg-cover bg-center"
          ></div>
        ) : (
          <>
            <Image
              onClick={() => setModalOpen(true)}
              src={avatarUrl.current}
              alt=""
              className="w-[150px] cursor-pointer h-[150px] rounded-full border-2 border-gray-400"
            />
            <PencilIcon
              onClick={() => setModalOpen(true)}
              className="w-6 h-6 rounded-md font-extrabold shadow-xl left-1/2 border-gray-400 bg-gray-200 top-0 p-0 cursor-pointer text-black absolute translate-y-[-50%] translate-x-[-50%]"
            />
          </>
        )}
      </div>
      {modalOpen && (
        <div
          className="relative z-10"
          aria-labelledby="crop-image-dialog"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-all"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center px-2 py-12 text-center ">
              <div className="relative w-[95%] sm:w-[600px] min-h-[60vh] rounded-2xl bg-white text-slate-100 text-left shadow-xl transition-all">
                <X
                  className="w-8 h-8 text-gray-950 top-2 cursor-pointer absolute right-4"
                  onClick={() => setModalOpen(false)}
                />
                <div className="px-5 py-4 flex flex-col justify-center items-center">
                  <ImageCropper
                    updateAvatar={(img: CanvasImageSource) => updateAvatar(img)}
                    closeModal={() => setModalOpen(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
