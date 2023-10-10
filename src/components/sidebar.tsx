export default function Sidebar() {
  return (
    <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-white border-r-4 border-indigo-500">
      <div className="text-black-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
        
          <h1 className="font-bold text-black-200 text-[15px] ml-3">
            TradeSaga
          </h1>
          <i className="bi bi-x cursor-pointer ml-28 lg:hidden"></i>
        </div>
      </div>
      <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-black">
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[15px] ml-4 text-black-200 font-bold">Home</span>
      </div>
      <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-black">
        <i className="bi bi-bookmark-fill"></i>
        <span className="text-[15px] ml-4 text-black-200 font-bold">
          Stock Dashboard
        </span>
      </div>
      <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-black">
        <i className="bi bi-bookmark-fill"></i>
        <span className="text-[15px] ml-4 text-black-200 font-bold">
          News
        </span>
      </div>
      <div className="my-4 bg-gray-600 h-[1px]"></div>
     <div className="">
      <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-black">
        <i className="bi bi-bookmark-fill"></i>
        <span className="text-[15px] ml-4 text-black-200 font-bold">
          Help
        </span>
      </div>
      <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-black">
        <i className="bi bi-bookmark-fill"></i>
        <span className="text-[15px] ml-4 text-black-200 font-bold">
          Settings
        </span>
      </div>
      </div>
    </div>
  );
}
