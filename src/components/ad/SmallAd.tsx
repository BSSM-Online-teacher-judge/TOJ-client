import React, { useEffect, useState } from "react";
import { instance } from "../../instance";

import { ad } from "../../interfaces/ad";

function SmallAd() {
  const [ad, setAd] = useState<ad>();
  useEffect(() => {
    const getAd = async () => {
      try {
        const adResponse = await instance.get("/ad");
        setAd(
          adResponse.data[Math.floor(Math.random() * adResponse.data.length)]
        );
      } catch (error) {
        console.log(error);
      }
    };
    getAd();
  }, []);
  return (
    <div className="Advertisement">
      <a href={ad?.link}>
        <img src={ad?.img} alt={`${ad?.advertiser}의 광고`} />
      </a>
    </div>
  );
}

export default SmallAd;
