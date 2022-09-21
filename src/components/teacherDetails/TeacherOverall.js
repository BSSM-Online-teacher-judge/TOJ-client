

import React from 'react';

function TeacherOverall() {
  const data = [{
    teacher: 'teacher',
    humor: 0,
    tenacity: 2,
    expertise: 7,
    fairness: 7,
    modesty: 3,
    passion: 3,
    stubborn: 10,
    authoritarianism: 10,
    SUA: 10,
  }];
  console.log(data);
  return (
    <ResponsiveRadar
      data={data}
      keys={['humor', 'tenacity', 'expertise', 'fairness', 'modesty', 'passion', 'stubborn', 'authoritarianism', 'SUA']}
      indexBy="teacher"
      valueFormat=" >-.2f"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      borderColor={{ from: 'color', modifiers: [] }}
      gridShape="linear"
      dotColor={{ theme: 'background' }}
      dotBorderWidth={2}
      dotBorderColor={{ theme: 'background' }}
      colors={{ scheme: 'blues' }}
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
  )
}

export default TeacherOverall; 