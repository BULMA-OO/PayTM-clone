/* eslint-disable react/prop-types */
export function User({ initial, name, _id, setUser, setOpenModal }) {
  return (
    <div className="flex justify-between w-full border-b border-[#7F7F7F] py-2">
      <div className="flex gap-4 items-center">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {initial}
          </span>
        </div>
        <div className="h-fit font-semibold text-lg">{name}</div>
      </div>
      <button
        onClick={() => {
          setUser({ name: name, _id: _id, initial: initial });
          setOpenModal(true);
        }}
        className="bg-black text-white w-[150px] rounded p-2 hover:bg-white hover:text-black hover:border-2 hover:border-black"
      >
        Send Money
      </button>
    </div>
  );
}
