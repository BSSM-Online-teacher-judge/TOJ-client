import React, { useEffect, useState } from "react";
import { noTokenInstance } from "../../instance";
import classNames from "classnames";
import "../../styles/Main.scss";
import { ad } from "../../interfaces/ad";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function BigAd() {
  const [ad, setAd] = useState<ad[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await noTokenInstance.get("/ad?size=BIG");
        setAd(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      {ad.length && (
        <Carousel
          autoPlay
          showThumbs={false}
          interval={5000}
          infiniteLoop
          autoFocus
        >
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
      )}
    </>
  );
}

export default BigAd;
