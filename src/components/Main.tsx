import React from "react";
import Header from "./Header";
import classNames from "classnames";
import "../styles/Main.scss";
import BigAd from "./ad/BigAd";

function Main() {
  return (
    <div className={classNames("main-root")}>
      <Header />
      <div>
        <BigAd />
        <div className={classNames("main-intro")}>
          <p className={classNames("main-intro-title")}>Teacher Online Judge</p>
          <p className={classNames("main-intro-text")}>
            선생님들 평가하고 선생님에 대한 학생들의 평가를 볼 수 있는 곳입니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
