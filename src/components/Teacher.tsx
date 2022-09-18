import classNames from "classnames";
import React, { useState } from "react";
import Header from "./Header";
import "../styles/Teacher.scss";
import { TiPlus, TiMinus } from "react-icons/ti";
import Modal from "react-modal";
import { instance } from "../instance";

function Teacher() {
  const [modal, setModal] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState({
    profileImg: "",
    name: "",
    description: "",
  });
  Modal.setAppElement("#root");
  const onModal = () => {
    setModal(true);
    console.log("wow");
  };
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const nextInputs = {
      ...teacherInfo,
      [name]: value,
    };

    setTeacherInfo(nextInputs);
  };

  const postTeacher = async () => {
    try {
      const response = await instance.post("teacher", teacherInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
      <Modal
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            zIndex: 100,
          },
          content: {
            width: "400px",
            height: "500px",
            margin: "auto",
            borderRadius: "20px",
            overflowX: "hidden",
          },
        }}
      >
        <div>
          이미지 선택 :{" "}
          <input type="file" name="profileImg" onChange={(e) => onChange(e)} />
        </div>
        <div>
          성함 : <input type="text" name="name" onChange={(e) => onChange(e)} />
        </div>
        <div>
          설명 : <textarea name="description" onChange={(e) => onChange(e)} />
        </div>
        <button onClick={() => postTeacher()}>확인</button>
      </Modal>
    </div>
  );
}

export default Teacher;
