import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserInfo } from "../modules/user";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Header from "./Header";
import { instance } from "../instance";
import classNames from "classnames";
import "../styles/Main.scss";
import { ad } from "../interfaces/ad";

function Main() {
  const user = useSelector((state) => state);
  const [ad, setAd] = useState<ad[]>([]);
  console.log(user);
  useEffect(() => {
    (async () => {
      try {
        const response = await instance.get("/ad", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        console.log(response);
        setAd(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <Header />
      <div>
        <Carousel autoPlay showThumbs={false} interval={5000} infiniteLoop>
          {ad.map((item) => {
            return (
              <div key={item.id} className={classNames("Main-carousel")}>
                <a href={item.link}>
                  <div>
                    <img src={item.img} alt={`${item.advertiser}의 광고`} />
                  </div>
                </a>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default Main;
