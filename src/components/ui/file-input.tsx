'use client';

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.css';
import { FilePond, FilePondProps, registerPlugin } from 'react-filepond';
import { cn } from '@/lib/utils';

registerPlugin(FilePondPluginImagePreview);

export const FileInput = ({ className, labelIdle, credits, ...props }: FilePondProps) => {
  return (
    <div className={cn('filepond-file-upload w-full', className)}>
      <FilePond
        credits={credits || false}
        {...props}
        labelIdle={`<div> ${labelIdle} <span style="text-decoration: underline">Browse</span></div>`}
      />
    </div>
  );
};
