import React, { useEffect, useState } from "react";
import { noTokenInstance } from "../../instance";

import { AdType } from "../../interfaces/interfaces";

function SmallAd() {
  const [ad, setAd] = useState<AdType>();
  useEffect(() => {
    const getAd = async () => {
      try {
        const adResponse = await noTokenInstance.get("/ad?size=SMALL");
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
