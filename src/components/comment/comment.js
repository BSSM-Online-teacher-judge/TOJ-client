import classNames from "classnames";
import { useEffect, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Recomment } from "../../allFiles";
import "../../styles/comment.scss"
import {instance} from "../../instance";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector } from "react-redux";

// interface Comment {
//   commentId: number;
//   content: string;
//   hasChild: string;
//   createdAt: string;
// }

export default function Comment({
  teacherId,
  commentId,
  content,
  hasChild,
  createdAt,
}) {
  const [more, setMore] = useState(false);
  const [writeComment, setWriteComment] = useState(false);
  const [reComment, setReComment] = useState([]);
  const [write, setWrite] = useState("");
  
  const users = useSelector((state) => state.users);

  const sub = createdAt.substring(11, createdAt.length - 7)
  const time = Number(sub.split(':')[0]) + 9;
  const date = createdAt.substring(0, 10) + " " + time + ":" + sub.split(':')[1] + ":" + sub.split(':')[2];

  useEffect(()=>{
    (async()=>{
      try {
        const response = await instance.get(`/teacher/comment/${commentId}/child`);
        setReComment(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [])

  const postComment = async () => {
    try{
      await instance.post('teacher/comment/child', {
        teacherId: teacherId,
        commentId: commentId,
        content: write,
      });
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div className={classNames("commentRoot")}>
      <div className={classNames("commentRoot commentDiv")}>
        <div className={classNames("commentDiv-user")}>
          <img
            src="/images/profileTest.png"
            alt="icon"
            className={classNames("user-profile")}
          />
          <span className={classNames("user-nickname")}>ㅇㅇ</span>
          <span className={classNames("user-date")}>{date}</span>
        </div>
        <p
          className={classNames("commentDiv-content")}
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
        <div className={classNames("commentDiv-detail")}>
          <span className={classNames("detail-recomment")} onClick={()=> setWriteComment((prev)=> !prev)}>답글 달기</span>
          {hasChild && <span className={classNames("detail-stick")}></span>}
          {hasChild && (
            <div onClick={()=> setMore((prev) => !prev)} className={classNames("detail-option")}>
              <AiOutlineCaretDown className={classNames("option-arrow")} />
              <span className={classNames("option-text")}>더보기</span>
            </div>
          )}
        </div>
      </div>
      {writeComment &&
        <div className="commentRoot-write">
          <CKEditor
            editor={ClassicEditor}
            date={write}
            onChange={(event, editor) => {
              const data = editor.getData();
              setWrite(data);
            }}
          />
          <button className={classNames("write-button")} onClick={() => postComment()}>작성</button>
        </div>
      }
      <div className="commentRoot-recomment">
        {more &&
          reComment.map((value) => (
            <Recomment
              content={value.content}
              createdAt={value.createdAt}
            />
          ))}
      </div>
    </div>
  );
}
