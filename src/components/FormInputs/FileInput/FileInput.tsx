"use-client";

import React, { ReactElement } from "react";

import { FilePond, FilePondProps, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const FileInput = ({ ...props }: FilePondProps): ReactElement => {
  return <FilePond credits={false} {...props} />;
};
