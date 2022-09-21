import React, { useContext } from "react";
import classNames from "classnames";
import "../styles/Header.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

function Header() {

  const user = useContext(UserContext);
  const logout = () => {
    
  }

  return (
    <header className="header">
      <Link to={"/"}>
        <img
          src="/images/logo.png"
          alt="로고"
          className={classNames("header logo")}
        />
      </Link>
      <div className={classNames("header div")}>
        {user.isLogin ? 
        <div>
          <span>{user.nickName}</span>
          <button onClick={logout}>로그아웃</button>
        </div> 
        :
        <div className={classNames("header signup")}>
          <span><Link to="/signup">회원가입</Link></span>
          <span className={classNames("header signup line")}></span>
          <span><Link to="/login">로그인</Link></span>
        </div>}
        <div className={classNames("header div category")}>
          <Link
            to={"/survey"}
            className={classNames("header div category item")}
          >
            단계별로 평가하기
          </Link>
          <Link to={"/"} className={classNames("header div category item")}>
            이달의 선생님
          </Link>
          <Link to={"/"} className={classNames("header div category item")}>
            랭킹
          </Link>
          <Link
            to={"/teacher"}
            className={classNames("header div category item")}
          >
            선생님
          </Link>
          <Link to={"/"} className={classNames("header div category item")}>
            질문 추천
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
