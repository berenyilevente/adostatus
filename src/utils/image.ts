import { FilePondFile } from "filepond";
import { UseFormSetValue } from "react-hook-form";

export const setImage = (
  fileItems: FilePondFile[],
  setValue: UseFormSetValue<any>
) => {
  if (fileItems.length > 0) {
    const fileItem = fileItems[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setValue("image", reader.result as string);
        return reader.result as string;
      }
    };
    if (fileItem.file.type.match("image.*")) {
      reader.readAsDataURL(fileItem.file);
    }
  } else {
    setValue("image", undefined);
    return undefined;
  }
};
