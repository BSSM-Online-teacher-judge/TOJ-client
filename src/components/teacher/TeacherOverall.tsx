import { ResponsiveRadar } from "@nivo/radar";
import React from "react";

function TeacherOverall({
  data,
  itemKey,
}: {
  data: Record<string, unknown>[];
  itemKey: string;
}) {
  return (
    <>
      <ResponsiveRadar
        data={data}
        keys={[itemKey]}
        indexBy="stat"
        valueFormat=">-.2f"
        // width={768}
        // width={300}
        margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
        // margin={itemKey === "긍정" ? { top: 80, right: 80, bottom: 80, left: 80 } : { top: 58.4, right: 80, bottom: 58.4, left: 80 }}
        borderColor={{ from: "color" }}
        gridShape="linear"
        maxValue={10}
        gridLabelOffset={36}
        colors={{ scheme: itemKey === "긍정" ? "category10" : "set1" }}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#999",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </>
  );
}

export default TeacherOverall;
