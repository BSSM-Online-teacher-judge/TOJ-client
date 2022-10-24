import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../styles/Teacher.scss";
import { TiPlus, TiMinus } from "react-icons/ti";
import { FiTool } from "react-icons/fi";
import Modal from "react-modal";
import { instance } from "../instance";
import { Link } from "react-router-dom";
import { css, keyframes } from "@emotion/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const reSize = keyframes`
  from{
    width: 16px;
    height: 16px;
  }
  50%{
    width: 20px;
    height: 20px;
  }
  to{
    width: 16px;
    height: 16px;
  }
`;

interface teacher {
  id: number;
  name: string;
  description: string;
  profileImg: string;
  numberOfLikes: number;
}

function TeacherList({ item }: { item: teacher }) {
  const [modal, setModal] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState({
    profileImg: "",
    name: "",
    description: "",
  });
  const putTeacher = async () => {
    try {
      const response = await instance.put(`teacher/${item.id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTeacher = async () => {
    try {
      const response = await instance.delete(`teacher/${item.id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
  return (
    <div className={classNames("item")}>
      {localStorage.getItem("authority") === "ADMIN" && (
        <>
          <TiMinus
            size={28}
            className={classNames("minus")}
            onClick={() => deleteTeacher()}
          />
          <FiTool
            size={28}
            className={classNames("tool")}
            onClick={() => setModal(true)}
          />
        </>
      )}
      <Link
        to={`/teacher/${item.id}`}
        state={{
          name: item.name,
          description: item.description,
          numberOfLikes: item.numberOfLikes,
        }}
      >
        <img
          src="./images/face.png"
          alt="선생님 얼굴"
          className={classNames("img")}
        />
        <h3>{item.name}</h3>
        <section>{item.description}</section>
      </Link>
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
        {/* <div>
          이미지 선택 :{" "}
          <input type="file" name="profileImg" onChange={(e) => onChange(e)} />
        </div> */}
        <div>
          성함 : <input type="text" name="name" onChange={(e) => onChange(e)} />
        </div>
        <div>
          설명 : <textarea name="description" onChange={(e) => onChange(e)} />
        </div>
        <button onClick={() => putTeacher()}>확인</button>
      </Modal>
    </div>
  );
}

function Teacher() {
  const [modal, setModal] = useState(false);
  const [teacherList, setTeacherList] = useState<teacher[]>([]);
  // const [myInfo, setMyInfo] = useState({});
  if (!localStorage.getItem("authority")) {
    const getUserInfo = async () => {
      try {
        const response = await instance.get("user");
        console.log(response.data.authority);
        localStorage.setItem("authority", response.data.authority);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }
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
      const response = await instance.post("teacher", teacherInfo);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTeacher = async () => {
      try {
        const response = await instance.get("teacher");
        setTeacherList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTeacher();
  }, []);
  return (
    <div>
      <Header />
      <div className={classNames("Teacher")}>
        <div className={classNames("title")}>
          <h1 className={classNames("title title")}>TEACHER</h1>
          {localStorage.getItem("authority") === "ADMIN" && (
            <TiPlus
              size={28}
              className={classNames("plus")}
              onClick={onModal}
            />
          )}
        </div>
        <div className={classNames("List")}>
          {teacherList.map((item) => {
            return <TeacherList item={item} key={item.id} />;
          })}
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
        {/* <div>
          이미지 선택 :{" "}
          <input type="file" name="profileImg" onChange={(e) => onChange(e)} />
        </div> */}
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
