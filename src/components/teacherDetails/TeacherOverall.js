import { ResponsiveRadar } from '@nivo/radar';
import React from 'react';

function TeacherOverall({ data, color, itemKey }) {
  return (
    <>
      <ResponsiveRadar
        data={data}
        keys={[itemKey]}
        indexBy="stat"
        valueFormat=">-.2f"
        // width={768}
        width={300}
        margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
        borderColor={{ from: 'color' }}
        gridShape="linear"
        maxValue={10}
        gridLabelOffset={36}
        colors={{ scheme: color }}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </>
  )
}

export default TeacherOverall; 