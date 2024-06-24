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
    className={twMerge(`bg-black/80 border-2 text-white font-semibold px-4 py-3 rounded-full uppercase w-full dyanmic-text-lg`, className)}
    onClick={onClick}>
        {children}
    </button>
  )
}

export default RoundedButton