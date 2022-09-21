import classNames from "classnames";
import { Header, TeacherTier, Comment } from "../../allFiles";
import "../../styles/teacherInfo.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { instance } from "../../instance";

function TeacherInfo() {
  const param = useParams();
  const location = useLocation();
  const [write, setWrite] = useState();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await instance.get(`/teacher/comment/${param.id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
          },
        });
        console.log(response);
        setComment(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
    setLoading(false);
  }, []);

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
          <p className={classNames("teacher explain name")}>{location.state.name}</p>
          <p className={classNames("teacher explain intro")}>{location.state.description}</p>
        </div>
        <TeacherTier name="인성" value="100%" />
        <TeacherTier name="엄" value="70%" />
      </div>
      <div className={classNames("teacher comments")}>
        {loading &&
          comment.map((value) => {
            return (
              <Comment
                teacherId={value.teacherId}
                commentId={value.commentId}
                content={value.content}
                hasChild={value.hasChild}
              />
            );
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
