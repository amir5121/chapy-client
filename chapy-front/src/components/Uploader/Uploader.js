import React, { useRef } from "react";

export default function Uploader(props) {
  const { uploadFile } = props;
  const selectImage = useRef(null);

  const onLoadImage = (img) => {
    let data = new FormData();
    data.append("file", img);
    uploadFile(data);
  };

  function upload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    onLoadImage(file);
  }

  return (
    <div onClick={() => selectImage.current.click()}>
      {props.children}
      <input
        ref={selectImage}
        // capture
        // accept="image/*"
        type="file"
        onChange={(e) => upload(e)}
        style={{ display: "none" }}
      />
    </div>
  );
}
