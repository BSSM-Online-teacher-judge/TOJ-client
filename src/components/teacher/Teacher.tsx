/** @jsxImportSource @emotion/react */
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";
import "../../styles/Teacher.scss";
import { TiPlus, TiMinus } from "react-icons/ti";
import { FiTool } from "react-icons/fi";
import Modal from "react-modal";
import { instance, noTokenInstance } from "../../instance";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";

export interface teacher {
  id: number;
  name: string;
  description: string;
  profileImg: string;
  numberOfLikes: number;
  numberOfSubmit: 1;
  liked: boolean;
}

function TeacherList({ item, index }: { item: teacher; index: number }) {
  const users = useSelector((state: RootState) => state.users);
  const [modal, setModal] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState({
    profileImg: "",
    name: "",
  });

  const putTeacher = async () => {
    try {
      const response = await instance.put(`teacher/${item.id}`, teacherInfo);
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
      {users.authority === "ADMIN" && (
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
          teacher: item,
        }}
      >
        <img
          src="/images/face.png"
          alt="????????? ??????"
          className={classNames("img")}
        />
        <h3>{item.name}</h3>
        <section>{item.description}</section>
        <div>
          {item.liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
          <span>{item.numberOfLikes}</span>
        </div>
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
          ????????? ?????? :{" "}
          <input type="file" name="profileImg" onChange={(e) => onChange(e)} />
        </div> */}
        <div>
          ?????? : <input type="text" name="name" onChange={(e) => onChange(e)} />
        </div>
        <div>
          ?????? : <textarea name="description" onChange={(e) => onChange(e)} />
        </div>
        <button onClick={() => putTeacher()}>??????</button>
      </Modal>
    </div>
  );
}

function Teacher() {
  const [modal, setModal] = useState(false);
  const users = useSelector((state: RootState) => state.users);
  const [teacherList, setTeacherList] = useState<teacher[]>([]);
  const [loading, setLoading] = useState(false);
  // const [myInfo, setMyInfo] = useState({});
  const [teacherInfo, setTeacherInfo] = useState({
    profileImg: "",
    name: "",
    description: "",
  });
  Modal.setAppElement("#root");
  const onModal = () => {
    setModal(true);
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
        setLoading(true);
        const response = await instance.get("teacher");
        setTeacherList(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getTeacher();
  }, []);
  return (
    <div>
      <Header />
      <div className={classNames("Teacher")}>
        <div className={classNames("title")}>
          <h1 className={classNames("title title")}>TEACHER</h1>
          {users.authority === "ADMIN" && (
            <TiPlus
              size={28}
              className={classNames("plus")}
              onClick={onModal}
            />
          )}
        </div>
        <div className={classNames("List")}>
          {!loading &&
            teacherList.map((item, index: number) => {
              return <TeacherList item={item} key={item.id} index={index} />;
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
          ????????? ?????? :{" "}
          <input type="file" name="profileImg" onChange={(e) => onChange(e)} />
        </div> */}
        <div>
          ?????? : <input type="text" name="name" onChange={(e) => onChange(e)} />
        </div>
        <div>
          ?????? : <textarea name="description" onChange={(e) => onChange(e)} />
        </div>
        <button onClick={() => postTeacher()}>??????</button>
      </Modal>
    </div>
  );
}

export default Teacher;
