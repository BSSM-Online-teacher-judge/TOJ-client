import classNames from "classnames";
import { Header, Comment } from "../../allFiles";
import "../../styles/teacherInfo.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { instance } from "../../instance";
import TeacherOverall from "./TeacherOverall";

function TeacherInfo() {
  const param = useParams();
  const location = useLocation();
  const [write, setWrite] = useState();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState([]);

  const [positiveData, setPositiveData] = useState([]);

  const [negativeData, setNegativeData] = useState([]);

  useEffect(() => {
    const getComment = async () => {
      try {
        setLoading(true);
        const response = await instance.get(`/stats/${param.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        const { humor, tenacity, expertise, fairness, modesty, passion } = response.data.positiveStats;
        const { stubborn, authoritarianism, sua } = response.data.negativeStats;

        const positiveStatsList = [humor, tenacity, expertise, fairness, modesty, passion];
        const negativeStatsList = [stubborn, authoritarianism, sua];

        const newPositiveStats = [{
          stat: '유머',
          긍정: positiveStatsList[0],
        }, {
          stat: '인성',
          긍정: positiveStatsList[1],
        }, {
          stat: '전문성',
          긍정: positiveStatsList[2],
        }, {
          stat: '공정성',
          긍정: positiveStatsList[3],
        }, {
          stat: '겸손',
          긍정: positiveStatsList[4],
        }, {
          stat: '열정',
          긍정: positiveStatsList[5],
        }];
        const newNegativeStats = [{
          stat: '고집',
          부정: negativeStatsList[0],
        }, {
          stat: '권위주의',
          부정: negativeStatsList[1],
        }, {
          stat: '급발진력',
          부정: negativeStatsList[2],
        },]

        setPositiveData(newPositiveStats);
        setNegativeData(newNegativeStats);

        const commentResponse = await instance.get(`/teacher/comment/${param.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        setComment(commentResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    getComment();
    setLoading(false);
  }, []);

  console.log(location.state);

  const postComment = async () => {
    try {
      await instance.post('teacher/comment', {
        teacherId: param.id,
        content: write,
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
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
          <p className={classNames("teacher explain name")}>
            {location.state.name}
          </p>
          <p className={classNames("teacher explain intro")}>
            {location.state.description}
          </p>
          <span>{location.state.numberOfLikes}</span>
        </div>
        {/* <TeacherTier name="인성" value="100%" />
        <TeacherTier name="엄" value="70%" /> */}
      </div>
      <div className={classNames('overallList')}>
        <div className={classNames("overall")}>
          <TeacherOverall data={positiveData} color={'category10'} itemKey={'긍정'} />
        </div>
        <div className={classNames("overall")}>
          <TeacherOverall data={negativeData} color={'set1'} itemKey={'부정'} />
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
          date={write}
          onChange={(event, editor) => {
            const data = editor.getData();
            setWrite(data);
          }}
        />
        <button className={classNames("write button")} onClick={() => postComment()}>작성</button>
      </div>
    </div>
  );
}

export default TeacherInfo;
