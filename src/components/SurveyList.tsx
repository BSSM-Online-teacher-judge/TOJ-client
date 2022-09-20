import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Header } from "../allFiles";
import { instance } from "../instance";
import "../styles/SurveyList.scss";

interface teacher {
  id: number;
  name: string;
  description: string;
  profileImg: string;
}

function SurveyList() {
  const [teacherList, setTeacherList] = useState([]);
  useEffect(() => {
    const getTeacher = async () => {
      try {
        const response = await instance.get("teacher");
        setTeacherList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTeacher();
  }, []);
  return (
    <div>
      <Header />
      <table className={classNames("SurveyList")}>
        <thead>
          <th className={classNames("SurveyList th first")}>문제</th>
          <th className={classNames("SurveyList th second")}>문제 제목</th>
          <th className={classNames("SurveyList th third")}>정보</th>
        </thead>
        <tbody>
          {teacherList.map((item: teacher, index) => {
            return (
              <tr className={classNames("SurveyList tr")} key={item.id}>
                <td className={classNames("SurveyList td first")}>
                  {index + 1}
                </td>
                <td className={classNames("SurveyList td second")}>
                  <img
                    src="https://d2gd6pc034wcta.cloudfront.net/tier/1.svg"
                    alt="티어"
                    className={classNames("SurveyList tier")}
                  />
                  <span
                    className={classNames("SurveyList name")}>{item.name}</span>
                </td>
                <td className={classNames("SurveyList td third")}>
                  {item.description}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SurveyList;
