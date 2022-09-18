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
  const [stat, setStat] = useState<stat[]>([]);
  
  return (
    <div>
      <Header />
    </div>
  );
}

export default Survey;
