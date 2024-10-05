import { useEffect, useState } from "react";
import { fetchUsers } from "./fetchData.jsx";
import { User } from "./User.jsx";
import { useQuery } from "@tanstack/react-query";
import { ModalWrapper } from "./ModalWrapper.jsx";
import axios from "axios";

export function Frame() {
  const [balance, setBalance] = useState("...loading");
  const [user, setUser] = useState("");
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [params, setParams] = useState("name");
  const { data, isLoading } = useQuery({
    queryKey: ["Search", params],
    queryFn: fetchUsers,
  });
  const userList = data?.users ?? [];

  useEffect(() => {
    async function getBalance() {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/account/balance`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setBalance(data.balance);
    }
    getBalance();
  }, [value]);

  return (
    <div className="flex flex-col px-6 w-full gap-6">
      <div className="text-xl font-bold">Your Balance: ₹{balance}</div>
      <div className="flex flex-col gap-4 w-full">
        <div className="text-xl font-bold">Users</div>
        <div className="w-full flex gap-6">
          <input
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            className=" p-2 border border-[#7F7F7F] rounded w-full"
            placeholder="Search Users..."
          />
          <button
            onClick={() => {
              setParams(filter);
            }}
            className="bg-black text-white min-w-[150px] rounded p-2 hover:bg-white hover:text-black hover:border-2 hover:border-black"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          userList.map((user, index) => {
            return (
              <User
                setUser={setUser}
                setOpenModal={setOpenModal}
                key={index}
                initial={user.firstName[0].toUpperCase()}
                name={user.firstName + " " + user.lastName}
                _id={user._id}
              />
            );
          })
        )}
      </div>
      <ModalWrapper
        value={value}
        setValue={setValue}
        openModal={openModal}
        setOpenModal={setOpenModal}
        user={user}
      />
    </div>
  );
}
