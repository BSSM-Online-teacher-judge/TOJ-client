import React from "react";
import Header from "./Header";
import "../styles/MonthlyTeacher.scss";
import classNames from "classnames";

function MonthlyTeacher() {
  return (
    <>
      <Header />
      <div className={classNames('Monthly')}>
        <h1>이달의 선생님</h1>
        <div className={classNames('rank')}>
          <div className={classNames('item first')}>
            
          </div>
          <div className={classNames('item second')}>

          </div>
          <div className={classNames('item third')}>

          </div>
        </div>
      </div>
    </>
  );
}

export default MonthlyTeacher;
