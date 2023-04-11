"use client";

import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      src="/images/placeholder.jpg"
      alt="avatar"
      height={30}
      width={30}
      className="rounded-full"
    />
  );
};

export default Avatar;
