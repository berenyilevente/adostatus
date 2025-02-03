import { FilePondFile } from "filepond";

export const convertImage = (fileItems: FilePondFile[]) => {
  if (fileItems.length < 0) {
    return undefined;
  }

  const fileItem = fileItems[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    if (reader.result) {
      return reader.result;
    }
  };
  if (fileItem.file.type.match("image.*")) {
    reader.readAsDataURL(fileItem.file);
  } else {
    return undefined;
  }
};
