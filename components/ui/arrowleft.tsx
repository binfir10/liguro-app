import React from 'react'
type ArrowRightProps = {
  status: string;
};

export default function ArrowRight({ status }: ArrowRightProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={` h-4 min-h-4 min-w-4 w-4  ${status === "error" ? "text-red-500" : status === "success" ? "text-green-500" : "text-yellow-500"}`}
    >
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}
