import React from "react";
import { useSelector } from "react-redux";
import { UserInfo } from "../modules/user";
import Header from "./Header";

function Main() {
  const user = useSelector((state) => state);
  console.log(user);
  return (
    <div>
      <Header />
    </div>
  );
}

export default Main;
