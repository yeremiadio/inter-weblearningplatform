import React from "react";

const RenderImageUpload = ({ imageValue = "", isRounded = false }) => {
  return (
    <div>
      {imageValue ? (
        typeof imageValue !== "object" ? (
          <div className="flex justify-center items-center">
            <img
              src={imageValue ? imageValue : "/imgPlaceholder.jpg"}
              alt=""
              className={`w-full h-56 object-cover ${
                isRounded ? "rounded-full w-56" : ""
              }`}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <img
              src={URL.createObjectURL(imageValue)}
              alt=""
              className={`w-full h-56 object-cover ${
                isRounded ? "rounded-full w-56" : ""
              }`}
            />
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default RenderImageUpload;
