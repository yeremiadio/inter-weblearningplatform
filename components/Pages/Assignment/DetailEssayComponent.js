import React from "react";

const DetailEssayComponent = ({ data, mutate, error }) => {
  console.log(data);
  return <div>Ini detail essay {JSON.stringify(data)}</div>;
};

export default DetailEssayComponent;
