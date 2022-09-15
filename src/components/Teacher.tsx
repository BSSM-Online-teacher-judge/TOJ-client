import classNames from "classnames";
import React from "react";
import Header from "./Header";
import "../styles/Teacher.scss";

function Teacher() {
  return (
    <div>
      <Header />
      <div className={classNames("Teacher")}>
        <h1 className={classNames("Teacher title")}>TEACHER</h1>
        <div className={classNames("Teacher List")}>
          <div className={classNames("Teacher item")}>
            <img src="./images/face.png" alt="선생님 얼굴"  className={classNames("Teacher img")}/>
            <h3>정승민</h3>
            <section>이 시대 최고의 참선생</section>
          </div>
          <div className={classNames("Teacher item")}>
            <img src="./images/face.png" alt="선생님 얼굴"  className={classNames("Teacher img")}/>
            <h3>정승민</h3>
            <section>이 시대 최고의 참선생</section>
          </div>
          <div className={classNames("Teacher item")}>
            <img src="./images/face.png" alt="선생님 얼굴"  className={classNames("Teacher img")}/>
            <h3>정승민</h3>
            <section>이 시대 최고의 참선생</section>
          </div>
          <div className={classNames("Teacher item")}>
            <img src="./images/face.png" alt="선생님 얼굴"  className={classNames("Teacher img")}/>
            <h3>정승민</h3>
            <section>이 시대 최고의 참선생</section>
          </div>
          <div className={classNames("Teacher item")}>
            <img src="./images/face.png" alt="선생님 얼굴"  className={classNames("Teacher img")}/>
            <h3>정승민</h3>
            <section>이 시대 최고의 참선생</section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teacher;
