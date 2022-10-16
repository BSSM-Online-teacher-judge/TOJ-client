import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../allFiles";
import { instance } from "../instance";
import "../styles/SurveyList.scss";
import { ad } from "../interfaces/ad";

interface teacher {
  id: number;
  name: string;
  description: string;
  profileImg: string;
  completed: boolean;
}

function SurveyList() {
  const [teacherList, setTeacherList] = useState([]);
  const [ad, setAd] = useState<ad>();
  useEffect(() => {
    const getTeacher = async () => {
      try {
        const response = await instance.get("teacher", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        setTeacherList(response.data);
        const adResponse = await instance.get("/ad", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        setAd(
          adResponse.data[Math.floor(Math.random() * adResponse.data.length)]
        );
      } catch (error) {
        console.log(error);
      }
    };
    getTeacher();
  }, []);
  return (
    <div>
      <Header />
      <div className="root">
        <div className={classNames("Advertisement")}>
          <a href={ad?.link}>
            <img src={ad?.img} alt={`${ad?.advertiser}의 광고`} />
          </a>
        </div>
        <table className={classNames("SurveyList")}>
          <thead>
            <th className={classNames("th first")}>문제</th>
            <th className={classNames("th second")}>문제 제목</th>
            <th className={classNames("th third")}>설명</th>
            <th className={classNames("th fourth")}>정보</th>
          </thead>
          <tbody>
            {teacherList.map((item: teacher, index) => {
              return (
                <tr className={classNames("tr")} key={item.id}>
                  <td className={classNames("td first")}>{index + 1}</td>
                  <td className={classNames("td second")}>
                    <img
                      src="https://d2gd6pc034wcta.cloudfront.net/tier/1.svg"
                      alt="티어"
                      className={classNames("tier")}
                    />
                    <span className={classNames("name")}>
                      <Link to={`/survey/${item.id}`} state={{ teacher: item }}>
                        {item.name}
                      </Link>
                    </span>
                  </td>
                  <td className={classNames("td third")}>
                    <span>{item.description}</span>
                  </td>
                  <td className={classNames("td fourth")}>
                    {item.completed ? (
                      <p className={classNames("third complete")}>성공</p>
                    ) : (
                      <p className={classNames("third incomplete")}>실패</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SurveyList;
