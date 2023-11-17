import { useRouter } from 'next/router';
import { FiHome, FiTrello, FiRss } from "react-icons/fi";
import { BsFillQuestionCircleFill, BsFillArrowUpRightCircleFill } from "react-icons/bs";
import Link from 'next/link';
import { RxLink2 } from "react-icons/rx";
export default function Sidebar() {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[350px] overflow-y-auto text-center bg-white border-r-2 border-[#EBEEF3] px-5 py-5 space-y-10">
      <div className="text-[#424242]-100 text-xl">
        <div className="h-[54px] p-2.5 mt-1 flex items-center justify-center">
          <CircleWithT />
          <h1 className="font-bold text-[#424242]-200 text-[18px] ml-3 text-[#424242]">
            TradeSaga
          </h1>
        </div>
      </div>
      <Link href="/" className={`h-[54px] p-2.5 mt-3 flex items-center rounded-[10px] px-4 duration-300 cursor-pointer text-[#424242] ${currentRoute == "/" ? "bg-[#F4F6F8]" : null}`}>
        <FiHome size="25px" />
        <span className="text-[18px] ml-4 text-[#424242]-200 font-bold">Home</span>
      </Link>
      <Link href="/dashboard" className={`h-[54px] p-2.5 mt-3 flex items-center rounded-[10px] px-4 duration-300 cursor-pointer text-[#424242]  ${currentRoute == "/dashboard" ? "bg-[#F4F6F8]" : null}`}>
        <FiTrello size="25px" />
        <span className="text-[18px] ml-4 text-[#424242]-200 font-bold">
          Stock Dashboard
        </span>
      </Link>
      <Link href="/news" className={`h-[54px] p-2.5 mt-3 flex items-center rounded-[10px] px-4 duration-300 cursor-pointer text-[#424242]  ${currentRoute == "/news" ? "bg-[#F4F6F8]" : null}`}>
        <FiRss size="25px" />
        <span className="text-[18px] ml-4 text-[#424242]-200 font-bold">
          News
        </span>
      </Link>
      <div className="absolute bottom-[40px] w-[310px]">
        <div className="my-4 bg-[#D9D9D9] h-[2px] w-[275px] ml-[17.5px]"></div>
        <div className="p-2.5 mt-3 flex items-center rounded-[10px] px-4 duration-300 cursor-pointer text-[#424242]">
          <BsFillQuestionCircleFill size="25px" color="black" />
          <span className="text-[18px] ml-4 text-[#424242]-200 font-bold">
            Help
          </span>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-[10px] px-4 duration-300 cursor-pointer text-[#424242]">
          <BsFillArrowUpRightCircleFill size="25px" color="black" />
          <span className="text-[18px] ml-4 text-[#424242]-200 font-bold">
            <a href="/profile">Settings</a>
          </span>
        </div>
      </div>
    </div>
  );
}

const CircleWithT = () => {
  return (
    <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
      <span className="text-white font-semibold text-[15px]">T</span>
    </div>
  );
};