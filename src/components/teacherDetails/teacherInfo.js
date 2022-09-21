import classNames from "classnames";
import { Header, TeacherTier, Comment } from "../../allFiles";
import "../../styles/teacherInfo.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { instance } from "../../instance";
import { ResponsiveRadar } from '@nivo/radar';

function TeacherOverall({ data, color, itemKey }) {
  return (
    <>
      <ResponsiveRadar
        data={data}
        keys={[itemKey]}
        indexBy="stat"
        valueFormat=">-.2f"
        // width={768}
        width={300}
        margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
        borderColor={{ from: 'color' }}
        gridShape="linear"
        maxValue={10}
        gridLabelOffset={36}
        colors={{ scheme: color }}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </>
  )
}



function TeacherInfo() {
  const param = useParams();
  const location = useLocation();
  const [write, setWrite] = useState();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState();

  const [positiveData, setPositiveData] = useState([{
    stat: '유머',
    긍정: 0,
  }, {
    stat: '인성',
    긍정: 3,
  }, {
    stat: '전문성',
    긍정: 5,
  }, {
    stat: '공정성',
    긍정: 9,
  }, {
    stat: '겸손',
    긍정: 4,
  }, {
    stat: '열정',
    긍정: 2,
  }]);

  const [negativeData, setNegativeData] = useState([{
    stat: '고집',
    부정: 0,
  }, {
    stat: '권위주의',
    부정: 3,
  }, {
    stat: '급발진력',
    부정: 5.4,
  },]);

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
          <p className={classNames("teacher explain name")}>
            {location.state.name}
          </p>
          <p className={classNames("teacher explain intro")}>
            {location.state.description}
          </p>
        </div>
        {/* <TeacherTier name="인성" value="100%" />
        <TeacherTier name="엄" value="70%" /> */}
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
      <div className={classNames('overallList')}>
        <div className={classNames("overall")}>
          <TeacherOverall data={positiveData} color={'category10'} itemKey={'긍정'} />
        </div>
        <div className={classNames("overall")}>
          <TeacherOverall data={negativeData} color={'set1'} itemKey={'부정'} />
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
