import { UploadArea } from './UploadArea';

/**
 * Render an UploadArea configured to log uploaded file names to the console.
 *
 * The wrapped onUpload handler logs the `File.name` of any uploaded file.
 *
 * @returns A JSX element that renders `UploadArea` with an `onUpload` handler which logs the uploaded file's name to the console.
 */
export function UploadAreaWrapper() {
  const onUpload = (f: File) => {
    console.log('File uploaded:', f.name);
  };
  return <UploadArea onUpload={onUpload} />;
}