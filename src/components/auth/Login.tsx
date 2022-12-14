import React, { useState } from "react";
import classNames from "classnames";
import { Header } from "../../allFiles";
import { noTokenInstance } from "../../instance";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import "../../styles/Login.scss";
import { useDispatch } from "react-redux";
import { setUser, UserInfo } from "../../modules/user";

interface login {
  email: string;
  password: string;
}

export default function Login() {
  const nav = useNavigate();
  const [input, setInput] = useState<login>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const onInsert = (userInfo: UserInfo) => {
    dispatch(setUser(userInfo));
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newInput = {
      ...input,
      [name]: value,
    };
    setInput(newInput);
  };


  const login = async () => {
    try {
      const { accessToken, refreshToken, authority } = (
        await noTokenInstance.post("/auth", input)
      ).data;
      console.log(accessToken, refreshToken);
      const userInfo = (await getUser(accessToken)).data;
      const user = {
        ...userInfo,
        isLogin: true,
        authority: authority,
      };
      console.log(user);
      onInsert(user);
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("refresh-token", refreshToken);
      nav("/");

    } catch (error) {
      console.log(error);
    }
  }

  const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") login();
  };

  const getUser = (accessToken: string) => {
    return noTokenInstance.get("/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return (
    <div className={classNames("login")}>
      <Header />
      <div className={classNames("login login-input-div")}>
        <h1 className={classNames("login-input-div title")}>?????????</h1>
        <div className={classNames("login-input-div list-div")}>
          <p className={classNames("list-div login-text")}>?????????</p>
          <ul className={classNames("list-div ul")}>
            <li className={classNames("login-input-list")}>
              <BsFillPersonFill className={classNames("input-list icon")} />
              <input
                type="text"
                value={input.email}
                name="email"
                onChange={(e) => {
                  change(e);
                }}
                onKeyDown={(e) => keyDown(e)}
              />
            </li>
            <li className={classNames("login-input-list")}>
              <FaLock className={classNames("input-list icon")} />
              <input
                type="password"
                value={input.password}
                name="password"
                onChange={(e) => {
                  change(e);
                }}
                onKeyDown={(e) => keyDown(e)}
              />
            </li>
            <li className={classNames("login-input-list")}>
              <button
                onClick={login}
                className={classNames("input-list login-button")}
              >
                ?????????
              </button>
            </li>
          </ul>
          <span className={classNames("signup-link")}>
            ?????? ????????? <Link to="/signup">??????</Link>?????? ??? ??? ????????????.
          </span>
        </div>
      </div>
    </div>
  );
}
