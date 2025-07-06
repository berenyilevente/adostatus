import { FilePondFile } from 'filepond';
import { UseFormSetValue } from 'react-hook-form';

interface SetImageProps {
  fileItems: FilePondFile[];
  setValue: UseFormSetValue<any>;
  name: string;
}

export const setImage = ({ fileItems, setValue, name }: SetImageProps) => {
  if (fileItems.length > 0) {
    const fileItem = fileItems[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setValue(name, reader.result as string);
        return reader.result as string;
      }
    };
    if (fileItem.file.type.match('image.*')) {
      reader.readAsDataURL(fileItem.file);
    }
  } else {
    setValue(name, undefined);
    return undefined;
  }
};
