/* eslint-disable react/prop-types */
export function Input({label, placeholder, type, onChange}) {
  return (
    <div className="flex flex-col justify-center w-full gap-2">
      <div className="font-semibold text-base w-fit">{label}</div>
      <input type={type} onChange={onChange}
        className="w-full p-2 border border-[#7F7F7F] rounded"
        placeholder={placeholder}
      />
    </div>
  );
}