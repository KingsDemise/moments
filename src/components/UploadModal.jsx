"use client";
import { useRecoilState } from "recoil";
import { modalState } from "../../atom/modalAtom";
import ReactModal from "react-modal";
import { CameraIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useSession } from "next-auth/react";
export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  async function uploadPost() {
    console.log("Session:", session);

    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      caption: captionRef.current.value,
      username: session.user.username,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  }
  function addImageToPost(event) {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  }
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  return (
    <div>
      {open && (
        <ReactModal
          ariaHideApp={false}
          className="w-[70%]  p-6 absolute top-20 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          isOpen={open}
          onRequestClose={() => {
            setOpen(false);
            setSelectedFile(null);
          }}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            <h1>Modal</h1>
            {selectedFile ? (
              <img
                onClick={() => setSelectedFile(null)}
                src={selectedFile}
                alt=""
                key={selectedFile}
                className="w-[50%] h-[50%] object-cover cursor-pointer"
              />
            ) : (
              <CameraIcon
                onClick={() => filePickerRef.current.click()}
                className="cursor-pointer h-14 p-2 text-red-500"
              />
            )}

            <input
              type="file"
              hidden
              ref={filePickerRef}
              onChange={addImageToPost}
            />
            <input
              type="text"
              maxLength="150"
              placeholder="Enter your caption..."
              className="m-4 border-none text-center w-full focus:ring-0 text-black"
              ref={captionRef}
            />
            <button
              disabled={!selectedFile || loading}
              onClick={uploadPost}
              className="flex bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              Upload Post
            </button>
          </div>
        </ReactModal>
      )}
    </div>
  );
}
