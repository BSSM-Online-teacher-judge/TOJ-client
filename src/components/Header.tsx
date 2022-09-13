import React from "react";
import classNames from "classnames";
import "../styles/Header.scss";

function Header() {
  return (
    <header className="header">
      <img
        src="./images/logo.png"
        alt="로고"
        className={classNames("header logo")}
      />
      <div className={classNames("header div")}>
        <div className={classNames("header signup")}>
          <span>회원가입</span>
          <span>로그인</span>
        </div>
        <ul>
          <li>문자</li>
          <li>문자</li>
          <li>문자</li>
          <li>문자</li>
          <li>문자</li>
          <li>문자</li>
          <li>문자</li>
          <li>문자</li>
          <li>문자</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
