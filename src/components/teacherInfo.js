import classNames from "classnames";
import { Header, Comment } from "../allFiles";
import "../styles/teacherInfo.scss";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TeacherInfo() {
  const param = useParams();
  const [write, setWrite] = useState();
  const [comment, setComment] = useState();
    useEffect(()=>{
        (async ()=>{
            try{
                setComment(await getComment());
            }catch(error){
                console.log(error);
            }
        })();
    })

    const getComment = () => {
        return axios.get(`/teacher/comment/${param.teacherId}`);
    }

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
        {comment.map((value)=>{
          return <Comment teacherId={value.teacherId} commentId={value.commentId} content={value.content} hasChild={value.hasChild} />
        })}
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
