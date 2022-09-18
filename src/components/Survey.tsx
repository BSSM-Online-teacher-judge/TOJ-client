import React, { useState } from "react";
import Header from "./Header";

interface stat {
  humor: number;
  tenacity: number;
  expertise: number;
  fairness: number;
  snackReadiness: number;
  modesty: number;
  passion: number;
  stubborn: number;
  authoritarianism: number;
  SUA: number;
}

function Survey() {
  const [stat, setStat] = useState<stat>();
  const statArray = [
    "유머",
    "인성",
    "전문성",
    "공평성",
    "간식 준비성",
    "겸손",
    "열정",
    "고집",
    "권위주의",
    "급발진력",
  ];
  return (
    <div>
      <Header />
      {statArray.map((item, index) => {
        return (
          <div key={index}>
            <span>
              {item} :
              {[...Array(10)].map((item, index) => {
                return (
                  <span key={index}>
                    <input type="radio" name="humor" />
                    <label htmlFor="humor">{index + 1}</label>
                  </span>
                );
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Survey;
