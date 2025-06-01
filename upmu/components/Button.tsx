import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700",
        props.className
      )}
    />
  );
}
