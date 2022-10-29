import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../styles/MonthlyTeacher.scss";
import classNames from "classnames";
import { noTokenInstance } from "../instance";
import { teacher } from "./teacher/Teacher";

function MonthlyTeacher() {
  const [teacher, setTeacher] = useState<teacher[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await noTokenInstance.get("/teacher/month");
        console.log(response.data);
        setTeacher(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <Header />
      <div className={classNames("Monthly")}>
        <h1>이달의 선생님</h1>
        {teacher.length && (
          <div className={classNames("rank")}>
            <div className={classNames("item first")}>
              <div className={classNames("div")}>
                <img
                  src="./images/face.png"
                  alt={`${teacher[1].name}의 사진`}
                />
                <h2>{teacher[1].name}</h2>
                <span>{teacher[1].description}</span>
              </div>
            </div>
            <div className={classNames("item second")}>
              <div className={classNames("div")}>
                <img
                  src="./images/face.png"
                  alt={`${teacher[0].name}의 사진`}
                />
                <h2>{teacher[0].name}</h2>
                <span>{teacher[0].description}</span>
              </div>
            </div>
            <div className={classNames("item third")}>
              <div className={classNames("div")}>
                <img
                  src="./images/face.png"
                  alt={`${teacher[2].name}의 사진`}
                />
                <h2>{teacher[2].name}</h2>
                <span>{teacher[2].description}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MonthlyTeacher;
