import classNames from "classnames";
import { useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Recomment } from "../allFiles";
import axios from "axios";
import { instance } from "../instance";

// interface Comment {
//   commentId: number;
//   content: string;
//   hasChild: string;
//   createdAt: string;
// }

export default function Comment({
  commentId,
  content,
  hasChild,
  createdAt,
}) {
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reComment, setReComment] = useState([]);

  const ReComment = async () => {
    try {
      setLoading(true);
      const response = await instance.get(`/teacher/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
        },
      });
      setReComment(response.data);
      setMore((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
    console.log(more);
    setLoading(false);
  };

  return (
    <div className={classNames("commentRoot")}>
      <div className={classNames("commentRoot comment")}>
        <div className={classNames("commentRoot user")}>
          <img
            src="/images/profileTest.png"
            alt="icon"
            className={classNames("user profile")}
          />
          <span className={classNames("user nickname")}>ㅇㅇ</span>
        </div>
        <p
          className={classNames("comment content")}
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
        <span>{createdAt}</span>
        <div className={classNames("comment detail")}>
          {hasChild && (
            <div>
              <AiOutlineCaretDown />
              <button
                onClick={ReComment}
                className={classNames("detail button")}
              >
                더보기
              </button>
            </div>
          )}
          <div className="asdfasdf">
            {hasChild &&
              more && loading &&
              reComment.map((value) => (
                <Recomment
                  teacherId={value.teacherId}
                  commentId={value.commentId}
                  content={value.content}
                  hasChild={value.hasChild}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
