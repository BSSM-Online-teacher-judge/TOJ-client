import { Header } from "../../allFiles";
import classNames from "classnames";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { instance } from "../../instance";
import { ad } from "../../interfaces/ad";
import "../../styles/ranking.scss";
import SmallAd from "../ad/SmallAd";

interface teacher {
  id: number;
  name: string;
  description: string;
  profileImg: string;
  numberOfLikes: number;
}

export default function Ranking() {
  const [teacherList, setTeacherList] = useState([]);
  useEffect(() => {
    const getTeacher = async () => {
      try {
        const response = await instance.get("/teacher/ranking");
        console.log(response.data);
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
      <SmallAd />
      <div className="root">
        <table className={classNames("RankingList")}>
          <thead>
            <tr>
              <th className={classNames("allth th-first")}>등수</th>
              <th className={classNames("allth th-second")}>이름</th>
              <th className={classNames("allth th-third")}>설명</th>
              <th className={classNames("allth th-fourth")}>좋아요</th>
            </tr>
          </thead>
          <tbody>
            {teacherList.map((item: teacher, index) => {
              return (
                <tr className={classNames("tr")} key={item.id}>
                  <td className={classNames("alltd td-first")}>{index + 1}</td>
                  <td className={classNames("alltd td-second")}>
                    <span className={classNames("name")}>
                      <Link to={`/survey/${item.id}`} state={{ teacher: item }}>
                        {item.name}
                      </Link>
                    </span>
                  </td>
                  <td className={classNames("alltd td-third")}>
                    <span>{item.description}</span>
                  </td>
                  <td className={classNames("alltd td-fourth")}>
                    <span>{item.numberOfLikes}</span>
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
