import classNames from "classnames";
import React, { useState } from "react";
import Header from "./Header";
import "../styles/Teacher.scss";
import { TiPlus, TiMinus } from "react-icons/ti";
import Modal from "react-modal";

function Teacher() {
  const [modal, setModal] = useState(false);
  const onModal = () => {
    setModal(true);
    console.log("wow");
  };
  return (
    <div>
      <Header />
      <div className={classNames("Teacher")}>
        <div className={classNames("Teacher title")}>
          <h1 className={classNames("Teacher title title")}>TEACHER</h1>
          <TiPlus
            size={28}
            className={classNames("Teacher plus")}
            onClick={onModal}
          />
        </div>
        <div className={classNames("Teacher List")}>
          <div className={classNames("Teacher item")}>
            <TiMinus size={28} className={classNames("Teacher minus")} />
            <img
              src="./images/face.png"
              alt="선생님 얼굴"
              className={classNames("Teacher img")}
            />
            <h3>정승민</h3>
            <section>이 시대 최고의 참선생</section>
          </div>
          <div className={classNames("Teacher item")}>
            <img
              src="./images/face.png"
              alt="선생님 얼굴"
              className={classNames("Teacher img")}
            />
            <h3>정승민</h3>
            <section>이 시대 최고의 참선생</section>
          </div>
          <div className={classNames("Teacher item")}>
            <img
              src="./images/face.png"
              alt="선생님 얼굴"
              className={classNames("Teacher img")}
            />
            <h3>정승민</h3>
            <section>이 시대 최고의 참선생</section>
          </div>
          <div className={classNames("Teacher item")}>
            <img
              src="./images/face.png"
              alt="선생님 얼굴"
              className={classNames("Teacher img")}
            />
            <h3>정승민</h3>
            <section>이 시대 최고의 참선생</section>
          </div>
          <div className={classNames("Teacher item")}>
            <img
              src="./images/face.png"
              alt="선생님 얼굴"
              className={classNames("Teacher img")}
            />
            <h3>정승민</h3>
            <section>이 시대 최고의 참선생</section>
          </div>
        </div>
      </div>
      <Modal isOpen={modal}></Modal>
    </div>
  );
}

export default Teacher;
