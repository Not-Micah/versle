"use client"

import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface RoundedButtonProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
    className={twMerge(className, `bg-black/80 text-white font-semibold px-4 py-3 rounded-full uppercase w-full text-xl`)}
    onClick={onClick}>
        {children}
    </button>
  )
}

export default RoundedButton