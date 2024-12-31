import IMAGES from "@/constants/images-constants/images-constants";

const getImagePath = (path) => require(`../../assets/${path}`);

export const getImageByKey = (key) => {
  if (IMAGES[key]) {
    return getImagePath(IMAGES[key]);
  }
  return null;
};
