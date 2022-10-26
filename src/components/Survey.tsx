import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { instance } from "../instance";
import Header from "./Header";
import "../styles/Survey.scss";
import { useLocation, useParams } from "react-router-dom";

interface teacher {
  id: number;
  name: string;
  description: string;
  profileImg: string;
  completed: boolean;
}

interface state {
  teacher: teacher;
}

function SurveyInput({ statArray }: { statArray: string[] }) {
  const [stat, setStat] = useState<number[]>([]);

  const param = useParams();
  const submit = async () => {
    try {
      const response = await instance.post(
        `stats/survey/${param.id}`,
        {
          humor: stat[0],
          tenacity: stat[1],
          expertise: stat[2],
          fairness: stat[3],
          modesty: stat[4],
          passion: stat[5],
          stubborn: stat[6],
          authoritarianism: stat[7],
          sua: stat[8],
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const changeStat = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newArray = [...stat];
    newArray[index] = Number(e.target.value);
    console.log(newArray);
    setStat(newArray);
  };
  return (
    <>
      <div className={classNames("survey")}>
        <div className={classNames("table")}>
          <div className={classNames("survey stat")}>
            <div className={classNames("survey top")}>
              {[...Array(10)].map((item, index) => {
                return (
                  <span className={classNames("survey th")}>{index + 1}</span>
                );
              })}
            </div>
          </div>
          {statArray.map((statItem, statIndex: number) => {
            return (
              <ul className={classNames("survey stat")} key={statIndex}>
                <span className={classNames("survey key")}>{statItem}</span>
                {[...Array(10)].map((item, index) => {
                  return (
                    <li key={index}>
                      <input
                        type="radio"
                        name={statItem}
                        value={index + 1}
                        onChange={(e) => changeStat(e, statIndex)}
                      />
                      {/* <label htmlFor={statItem}>{index + 1}</label> */}
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      </div>

      <div className="submit-div">
        <button onClick={() => submit()} className="submit">
          제출
        </button>
      </div>
    </>
  );
}

function Survey() {
  const location = useLocation().state as state;
  const { teacher } = location;
  const param = useParams();
  const statArray = [
    "유머",
    "인성",
    "전문성",
    "공평성",
    // "간식 준비성",
    "겸손",
    "열정",
    "고집",
    "권위주의",
    "급발진력",
  ];
  const [presentStat, setPresentStat] = useState<number[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await instance.get(`/stats/${param.id}` );
        const { humor, tenacity, expertise, fairness, modesty, passion } =
          response.data.positiveStats;
        const { stubborn, authoritarianism, sua } = response.data.negativeStats;
        setPresentStat([
          humor,
          tenacity,
          expertise,
          fairness,
          modesty,
          passion,
          stubborn,
          authoritarianism,
          sua,
        ]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <Header />
      <div className={classNames("survey")}>
        <div className={classNames("title")}>
          <span className={classNames("name")}>{teacher.name}</span>
          {teacher.completed ? (
            <span className={classNames("third complete")}>성공</span>
          ) : (
            <span className={classNames("third incomplete")}>실패</span>
          )}
        </div>
        <div className={classNames("table")}>
          <div className={classNames("topStat")}>
            {statArray.map((item) => {
              return (
                <span className={classNames("topStatItem th")}>{item}</span>
              );
            })}
          </div>
          <div className={classNames("topStat")}>
            {presentStat.map((item) => {
              return (
                <span className={classNames("topStatItem td")}>{item}</span>
              );
            })}
          </div>
        </div>
        <div className={classNames("content")}>
          <div className={classNames("headline")}>
            <h3>문제</h3>
          </div>
          <p>{teacher.description}</p>
          <div className={classNames("headline")}>
            <h3>입력</h3>
          </div>
        </div>
      </div>
      <SurveyInput statArray={statArray} />
    </div>
  );
}

export default Survey;
