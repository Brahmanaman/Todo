import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="h-13 bg-white rounded text-black my-2 mx-1 flex items-center justify-center gap-2">
        <img src="./images/logo.png" alt="logo" />
        <h1 className="font-semibold text-xl"> Firebase Todo App</h1>
      </div>
    </>
  );
};

export default Navbar;
