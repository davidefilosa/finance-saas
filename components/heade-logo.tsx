import { Currency } from "lucide-react";
import Link from "next/link";
import React from "react";

export const HeaderLogo = () => {
  return (
    <Link href={"/"}>
      <div className="items-center hidden lg:flex">
        <Currency className="w-8 h-8 text-white font-bold" />
        <p className="font-semibold text-white text-2xl ml-2.5">Finance</p>
      </div>
    </Link>
  );
};
