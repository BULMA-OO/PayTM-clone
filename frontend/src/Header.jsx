/* eslint-disable react/prop-types */
export function Header({title, subHeading}) {
 return (
   <div className="flex flex-col w-full items-center justify-center gap-3">
     <div className="text-4xl font-bold ">{title}</div>
     <div className="text-base font-normal text-center px-6">
       {subHeading}
     </div>
   </div>
 );
}