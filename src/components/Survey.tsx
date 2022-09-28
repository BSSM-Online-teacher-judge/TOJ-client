import classNames from "classnames";
import React, { useState } from "react";
import { instance } from "../instance";
import Header from "./Header";
import "../styles/Survey.scss";
import { useParams } from "react-router-dom";

function SurveyInput() {
  const [stat, setStat] = useState<number[]>([]);
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
  const submit = async () => {
    try {
      const response = await instance.post(
        `stats/survey/${param.id}`,
        {
          humor: stat[0],
          tenacity: stat[1],
          expertise: stat[2],
          fairness: stat[3],
          // snackReadiness: stat[0],
          modesty: stat[4],
          passion: stat[5],
          stubborn: stat[6],
          authoritarianism: stat[7],
          sua: stat[8],
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
          },
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
                    <label htmlFor={statItem}>{index + 1}</label>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
      <div className="submit-div">
        <button onClick={() => submit()} className="submit">제출</button>
      </div>
    </>
  );
}

function Survey() {
  return (
    <div>
      <Header />
      <SurveyInput />
    </div>
  );
}

export default Survey;
