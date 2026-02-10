import { UploadArea } from './UploadArea';

export function UploadAreaWrapper() {
  const onUpload = (f: File) => {
    console.log('File uploaded:', f.name);
  };
  return <UploadArea onUpload={onUpload} />;
}
