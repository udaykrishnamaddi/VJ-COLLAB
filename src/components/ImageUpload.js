import React, { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  //   const handleUpload = async e => {
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append("image", image.raw);

  //     await fetch("YOUR_URL", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "multipart/form-data"
  //       },
  //       body: formData
  //     });
  //   };

  return (
    <div className="text-center">
      <label htmlFor="upload-button">
        {image.preview ? (
          <img src={image.preview} alt="dummy" width="300vw" height="250vw" />
        ) : (
          <div>
            <h5
              className="text-center image-upload-wrap pt-3"
              style={{ width: "300px", height: "100px" }}
            >
              Upload your photo
            </h5>
          </div>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <br />
      {/* <button onClick={handleUpload}>Upload</button> */}
    </div>
  );
};

export default ImageUpload;
