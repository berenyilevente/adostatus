'use client';

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.css';
import { FilePond, FilePondProps, registerPlugin } from 'react-filepond';
import { cn } from '@/lib/utils';

registerPlugin(FilePondPluginImagePreview);

export const AvatarInput = ({ className, labelIdle, credits, ...props }: FilePondProps) => {
  const label = labelIdle ? labelIdle : '';
  return (
    <div className={cn('w-1/4 !rounded-lg', className)}>
      <FilePond
        {...props}
        credits={credits || false}
        labelIdle={`<div> ${label} <span style="text-decoration: underline">Browse</span></div>`}
      />
    </div>
  );
};
