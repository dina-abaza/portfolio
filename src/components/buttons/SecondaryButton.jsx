import Link from "next/link";

export default function SecondaryButton({ href, text }) {
  return (
    <Link href={href}>
      <button className="w-auto  min-h-[45px]   whitespace-nowrap rounded-xl py-[10px] px-[16px]
        bg-black text-white  border border-white/50 text-[16px] md:text-[18px]
        transition-all duration-300 hover:opacity-80 font-bold">
        {text}
      </button>
    </Link>
  );
}
