'use client';
import Image from "next/image";
import React from "react";

interface AvatarPros {
    src: string | null | undefined;
};

const Avatar: React.FC<AvatarPros> = ({
    src
}) => {
  return(
      <Image
        className="rounded-full"
        height="30"
        width="30"
        alt="Avatar"
        src={ src || "/images/placeholder.jpg"}
      />
  );
}

export default Avatar;