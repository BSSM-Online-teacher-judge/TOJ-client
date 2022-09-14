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
          <span className={classNames("header signup line")}></span>
          <span>로그인</span>
        </div>
        <div className={classNames('header div category')}>
          <span>단계별로 평가하기</span>
          <span>이달의 선생님</span>
          <span>랭킹</span>
          <span>월간 평가</span>
          <span>질문 추천</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
