import { FilePondFile } from "filepond";

export const convertImage = (fileItems: FilePondFile[]): string | undefined => {
  let image;

  if (fileItems.length > 0) {
    const fileItem = fileItems[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        image = reader.result as string;
        return image;
      }
    };
  }
  console.log(image);
  return image;
};
