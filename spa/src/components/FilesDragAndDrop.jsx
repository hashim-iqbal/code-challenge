import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";

const FilesDragAndDrop = ({ onFileUpload }) => {
  const fileTypes = ["mp4", "mov"];

  const handleDrop = (file) => {
    onFileUpload(file);
  };

  return (
    <>
      <FileUploader
        multiple={false}
        handleChange={handleDrop}
        name="file"
        types={fileTypes}
        onTypeError={(err) => console.log(err)}
        maxSize={200}
        required
        onSizeError={(err) => console.log(err)}
      />
    </>
  );
};

export default FilesDragAndDrop;
