/* eslint-disable react/prop-types */
import { Modal } from "flowbite-react";
import { Header } from "./Header.jsx";
import axios from "axios";
import { useState } from "react";
("use client");

export function ModalWrapper({
  user,
  openModal,
  setOpenModal,
  value,
  setValue,
}) {
  const [amount, setAmount] = useState(0);

  async function performTransfer() {
    setOpenModal(false);
    await axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      {
        amount: amount,
        to: user._id,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setValue(value + 1);
    setAmount(0);
  }

  return (
    <Modal show={openModal}>
        <div className="flex flex-col gap-6 p-8  w-full rounded-lg border-2 shadow-[0_2px_6px_0_#1A181E0A]">
          <Header title={"Send Money"} subHeading={""} />
          <div className="flex gap-4 items-center">
            <div className="relative inline-flex items-center justify-center w-14 h-14 overflow-hidden bg-[#21C55D] rounded-full">
              <span className="font-medium text-xl text-white">
                {user.initial}
              </span>
            </div>
            <div className="h-fit font-semibold text-lg">{user.name}</div>
          </div>
          <div className="flex flex-col justify-center w-full gap-2">
            <div className="font-semibold text-base w-fit">Amount (in Rs)</div>
            <input
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type="number"
              className="w-full p-2 border border-[#7F7F7F] rounded"
              placeholder="Enter Amount"
            />
          </div>
          <div className="flex gap-6">
            <button
              onClick={performTransfer}
              className="w-full text-white bg-[#21C55D] p-2 rounded hover:text-black hover:border-2 hover:border-black"
            >
              Initiate Transfer
            </button>
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              className="w-full text-white bg-black p-2 rounded  hover:bg-white hover:text-black hover:border-2 hover:border-black"
            >
              Abort Transfer
            </button>
          </div>
        </div>
    </Modal>
  );
}
