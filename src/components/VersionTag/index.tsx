import React from "react";

const VersionTag: React.FC = () => {
  return VERSION ? (
    <span
      style={{
        backgroundColor: "gray",
        color: "white",
        fontWeight: "bolder",
        position: "fixed",
        top: 0,
        left: 0,
        borderBottomRightRadius: 30,
        lineHeight: 1,
        padding: 10,
        paddingRight: 20,
        opacity: "80%",
        fontSize: 12,
        zIndex: 2000,
      }}
    >
      前端版本：{VERSION}
    </span>
  ) : (
    <></>
  );
};

export default VersionTag;
