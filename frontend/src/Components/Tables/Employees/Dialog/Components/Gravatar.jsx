import React from "react";
import { createAvatar } from "@dicebear/core";
import { funEmoji } from "@dicebear/collection";
import { Image } from "primereact/image";

export const Gravatar = ({ randomSeed, size = 170 }) => {
  const avatar = createAvatar(funEmoji, {
    seed: randomSeed,
    radius: 50,
    backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
    backgroundType: ["gradientLinear", "solid"],
    mouth: ["cute", "kissHeart", "lilSmile", "smileLol", "smileTeeth", "tongueOut", "wideSmile"],
  });
  const dataUri = avatar.toDataUri();
  return <Image src={dataUri} alt="Image" width={size} height={size} />;
};
