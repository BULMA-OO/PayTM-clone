
/* eslint-disable react/prop-types */
export function Footer({label, footing, subLabel, onClick1, onClick2}) {
  return (
    <div className="flex flex-col justify-center w-full gap-2">
      <button
        onClick={onClick1}
        className="w-full text-gray-50 bg-black p-2 rounded hover:bg-white hover:text-black hover:border-2 hover:border-black"
      >
        {label}
      </button>
      <div className="text-center font-medium">
        {footing}
        <span onClick={onClick2} className="underline cursor-pointer">
          {subLabel}
        </span>
      </div>
    </div>
  );
}