/** @jsxImportSource @emotion/react */
import classNames from "classnames";
import { Header, Comment } from "../../allFiles";
import "../../styles/teacherInfo.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../instance";
import { css, keyframes } from "@emotion/react";
import TeacherOverall from "./TeacherOverall";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { teacher } from "./Teacher";
import {
  PositiveDataType,
  NegativeDataType,
  CommentType,
} from "../../interfaces/interfaces";
declare module "@ckeditor/ckeditor5-react";

function TeacherInfo() {
  const reSize = keyframes`
    from{
      width: 36px;
      height: 36px;
    }
    50%{
      width: 42px;
      height: 42px;
    }
    to{
      width: 36px;
      height: 36px;
    }
  `;
  const param = useParams();
  const location = useLocation();
  const teacher = location.state as teacher;
  const nav = useNavigate();
  const [write, setWrite] = useState("");
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState({
    numberOfLikes: 0,
    liked: false,
  });
  const [pushed, setPushed] = useState(false);
  const [comment, setComment] = useState<CommentType[]>([]);
  const firstPush = useRef(false);

  const [positiveData, setPositiveData] = useState<Record<string, unknown>[]>(
    []
  );

  const [negativeData, setNegativeData] = useState<Record<string, unknown>[]>(
    []
  );
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getComment = async () => {
      try {
        setLoading(true);
        const commentResponse = await instance.get(
          `/teacher/comment/${param.id}`
        );
        setComment(commentResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComment();
    setLoading(false);
  }, [reload]);

  useEffect(() => {
    const getStats = async () => {
      const response = await instance.get(`/stats/${param.id}`);
      const { humor, tenacity, expertise, fairness, modesty, passion } =
        response.data.positiveStats;
      const { stubborn, authoritarianism, sua } = response.data.negativeStats;

      const positiveStatsList = [
        humor,
        tenacity,
        expertise,
        fairness,
        modesty,
        passion,
      ];
      const negativeStatsList = [stubborn, authoritarianism, sua];

      const newPositiveStats = [
        {
          stat: "유머",
          긍정: positiveStatsList[0],
        },
        {
          stat: "인성",
          긍정: positiveStatsList[1],
        },
        {
          stat: "전문성",
          긍정: positiveStatsList[2],
        },
        {
          stat: "공정성",
          긍정: positiveStatsList[3],
        },
        {
          stat: "겸손",
          긍정: positiveStatsList[4],
        },
        {
          stat: "열정",
          긍정: positiveStatsList[5],
        },
      ];
      const newNegativeStats = [
        {
          stat: "고집",
          부정: negativeStatsList[0],
        },
        {
          stat: "권위주의",
          부정: negativeStatsList[1],
        },
        {
          stat: "급발진력",
          부정: negativeStatsList[2],
        },
      ];

      setPositiveData(newPositiveStats);
      setNegativeData(newNegativeStats);
    };
    getStats();
  }, []);

  const postComment = async () => {
    try {
      await instance.post("teacher/comment", {
        teacherId: param.id,
        content: write,
      });
      setWrite("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTeacher = async () => {
      try {
        setLoading(true);
        const response = await instance.get("/teacher");
        let index: number = 0;
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].id === Number(param.id)) {
            index = i;
          }
        }
        console.log(index);
        setLike({
          liked: response.data[index].liked,
          numberOfLikes: response.data[index].numberOfLikes,
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getTeacher();
  }, [param.id, pushed]);

  const pushLike = async () => {
    try {
      if (!like.liked) {
        await instance.post(`/teacher/like/${param.id}`, null);
        setPushed(true);
      } else {
        await instance.delete(`/teacher/like/${param.id}`);
        setPushed(false);
      }
    } catch (error) {
      console.log(error);
    }
    firstPush.current = true;
  };

  return (
    <div className={classNames("teacher")}>
      <Header />
      <div className={classNames("teacher teacherInfo")}>
        <button
          className={classNames("teacherInfo button")}
          onClick={() => nav(`/survey/${param.id}`)}
        >
          평가
        </button>
        <img
          src="/images/face.png"
          alt={`${teacher.name}의 사진`}
          className={classNames("teacherInfo picture")}
        />
        <div className={classNames("teacherInfo ability")}></div>
        <div className={classNames("teacherInfo explain")}>
          <p className={classNames("teacher explain name")}>{teacher.name}</p>
          <p className={classNames("teacher explain intro")}>
            {teacher.description}
          </p>
          <div
            onClick={() => pushLike()}
            className={classNames("teacher explain like")}
          >
            {like.liked ? (
              <AiFillHeart
                size={36}
                css={css`
                  animation: ${firstPush.current
                    ? css`
                        ${reSize} 0.15s ease-in-out 1
                      `
                    : "none"};
                  color: red;
                `}
              />
            ) : (
              <AiOutlineHeart
                size={36}
                css={css`
                  animation: ${firstPush.current
                    ? css`
                        ${reSize} 0.15s ease-in-out 1
                      `
                    : "none"};
                `}
              />
            )}
            <span>{like.numberOfLikes}</span>
          </div>
        </div>
        {/* <TeacherTier name="인성" value="100%" />
        <TeacherTier name="엄" value="70%" /> */}
      </div>
      <div className={classNames("overallList")}>
        <div className={classNames("overall")}>
          <TeacherOverall
            data={positiveData}
            itemKey={"긍정"}
          />
        </div>
        <div className={classNames("overall")}>
          <TeacherOverall data={negativeData} itemKey={"부정"} />
        </div>
      </div>
      <div className={classNames("teacher comments")}>
        {!loading &&
          comment.map((value) => {
            return (
              <Comment
                teacherId={param.id}
                commentId={value.id}
                createdAt={value.createdAt}
                content={value.content}
                hasChild={value.hasChild}
                key={value.id}
              />
            );
          })}
      </div>
      <div className="teacher write">
        <CKEditor
          editor={ClassicEditor}
          data={write}
          onChange={(event, editor) => {
            const data = editor.getData();
            setWrite(data);
          }}
        />
        <button
          className={classNames("write button")}
          onClick={async () => {
            await postComment();
            setReload((prev) => !prev);
          }}
        >
          작성
        </button>
      </div>
    </div>
  );
}

export default TeacherInfo;
