import { useEffect, useState } from "react";
import axios from "axios";

export function Navbar() {
  const [name, setName] = useState("");
  const [initial, setInitial] = useState("");
  useEffect(() => {
    async function getInfo() {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/user/myinfo",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setName(data.name);
      setInitial(data.name[0].toUpperCase());
    }
    getInfo();
  });

  return (
    <div className=" flex w-full h-16 justify-between items-center px-6 border-b border-[#7F7F7F]">
      <div className="font-bold text-3xl h-fit">PAYments App</div>
      <div className="flex items-center gap-6">
        <div className="h-fit font-medium text-lg">Hello, {name}</div>

        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {initial}
          </span>
        </div>
      </div>
    </div>
  );
}
