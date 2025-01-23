"use client";

import Modal from "@/components/Modal";
import axiosInstance from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { KeretaType } from "../types";

type props = {
    kereta: KeretaType
}

const DeleteKereta = (myProp: props) => {
  const [Show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
        e.preventDefault()
        const TOKEN = getCookie(`token`)
        const url = `/train/${myProp.kereta.id}`

        //hit endpoint 
        const response: any = await axiosInstance
        .delete(url, {
            headers: {
                authorization: `Bearer ${TOKEN}`
            }
        })

        const message = response.data.message

        if(response.data.success == true){
            toast(
                `${message}`,
                {
                    containerId: `toastDelete-${myProp.kereta.id}`,
                    type: "success",
                    theme: "colored",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                }
                )
                setShow(false)
                // reload page 
                setTimeout(() => router.refresh(), 1000)
        } else {
            toast(
                `${message}`,
                {
                    containerId: `toastDelete-${myProp.kereta.id}`,
                    type: "error",
                    theme: "colored",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                }
            )
        }
    } catch (error) {
        console.log(error);
        toast(
            `Something wrong`,
            {
                containerId: `toastDelete-${myProp.kereta.id}`,
                type: "error",
                theme: "colored",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }
        )
    }
  }

  return (
    <div>
        <ToastContainer containerId={`toastDelete-${myProp.kereta.id}`}/>
      <button
        onClick={() => openModal()}
        type="button"
        className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-500"
      >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

      </button>
      <Modal isShow={Show}>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-lg">
            <h1 className="font-semibold text-lg">Edit Data Kereta</h1>
            <span className="text-sm text-slate-500">
              Pastikan data yang diisi suda benar
            </span>
          </div>
          <div className="w-full p-3">
            Apakah Anda yakin ingin menghapus data kereta dengan nama {myProp.kereta.name}?
          </div>

          {/* Modal footer */}
          <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
            <button 
                type="button"
                className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600"
                onClick={() => closeModal()}
            >
                Close
            </button>

            <button 
                type="submit"
                className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600"
            >
                Ya, Deh
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DeleteKereta;
