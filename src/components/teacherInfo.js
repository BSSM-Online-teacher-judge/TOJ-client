import classNames from "classnames";
import { Header } from "../allFiles";
import "../styles/teacherInfo.scss";
import { AiOutlineCaretDown } from "react-icons/ai";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";

function TeacherInfo() {
  const postCommnet = () => { };

  const [write, setWrite] = useState();

  return (
    <div className={classNames("teacher")}>
      <Header />
      <div className={classNames("teacher teacherInfo")}>
        <button className={classNames("teacherInfo button")}>평가</button>
        <img
          src="/images/honggildong.jpg"
          alt="icon"
          className={classNames("teacherInfo picture")}
        />
        <div className={classNames("teacherInfo ability")}></div>
        <div className={classNames("teacherInfo explain")}>
          <p className={classNames("teacher explain name")}>홍길동</p>
          <p className={classNames("teacher explain intro")}>의적이다</p>
        </div>
      </div>
      <div className={classNames("teacher comments")}>
        <div className={classNames("comments comment")}>
          <div className={classNames("comment user")}>
            <img
              src="/images/profileTest.png"
              alt="icon"
              className={classNames("user profile")}
            />
            <span className={classNames("user nickname")}>ㅇㅇ</span>
          </div>
          <p className={classNames("comment content")}>하이</p>
          <div className={classNames("comment detail")}>
            <AiOutlineCaretDown />
            <button className={classNames("detail button")}>더보기</button>
          </div>
        </div>
        <div className={classNames("comments comment")}>
          <div className={classNames("comment user")}>
            <img
              src="/images/profileTest.png"
              alt="icon"
              className={classNames("user profile")}
            />
            <span className={classNames("user nickname")}>ㅇㅇ</span>
          </div>
          <p className={classNames("comment content")}>
            ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
          </p>
        </div>
      </div>
      <div className="teacher write">
        <CKEditor
          editor={ClassicEditor}
          date={write}
          onChange={(event, editor) => {
            const data = editor.getData();
            setWrite(data);
          }}
        />
        <button className={classNames("write button")}>작성</button>
      </div>
    </div>
  );
}

export default TeacherInfo;
