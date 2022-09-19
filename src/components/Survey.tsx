import React, { useState } from "react";
import { instance } from "../instance";
import Header from "./Header";

function Survey() {
  const [stat, setStat] = useState<number[]>([]);
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
        "teacher",
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
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
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
    <div>
      <Header />
      {statArray.map((statItem, statIndex) => {
        return (
          <div key={statIndex}>
            <ul>
              {statItem} :
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
          </div>
        );
      })}
      <button onClick={() => submit()}>제출</button>
    </div>
  );
}

export default Survey;
