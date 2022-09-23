import React from "react";
import classNames from "classnames";
import "../styles/Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../instance";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../modules';
import { removeUser } from '../modules/user'

function Header() {

  const nav = useNavigate();
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const onRemove = () => {
    dispatch(removeUser());
  }

  const logout = () => { 
    instance.delete('/auth', { headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
    }})
    onRemove();
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("refresh-token");
    nav('/');
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
        {users.isLogin ? 
        <div className={classNames("header user")}>
          <span className={classNames("header username")}>{users.nickName}</span>
          <span className={classNames("header signup line")}></span>
          <span className={classNames("header logout")} onClick={logout}>로그아웃</span>
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
