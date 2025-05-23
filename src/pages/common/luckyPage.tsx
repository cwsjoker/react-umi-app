import React, { useState, useRef } from 'react'
import { LuckyWheel } from '@lucky-canvas/react'

const LuckyPage = () => {
  const [blocks] = useState([
    { padding: '10px', background: '#869cfa' }
  ])
  const [prizes] = useState([
    { background: "#e9e8fe", fonts: [{ text: "0" }] },
    { background: "#b8c5f2", fonts: [{ text: "1" }] },
    { background: "#e9e8fe", fonts: [{ text: "2" }] },
    { background: "#b8c5f2", fonts: [{ text: "3" }] },
    { background: "#e9e8fe", fonts: [{ text: "4" }] },
    { background: "#b8c5f2", fonts: [{ text: "5" }] },
    { background: "#e9e8fe", fonts: [{ text: "6" }] },
    { background: "#b8c5f2", fonts: [{ text: "7" }] },
  ]);
  const [buttons] = useState([
    { radius: '40%', background: '#617df2' },
    { radius: '35%', background: '#afc8ff' },
    {
      radius: '30%', background: '#869cfa',
      pointer: true,
      fonts: [{ text: '开始', top: '-10px' }]
    }
  ])

  const myLucky = useRef()

  return <div>
    <LuckyWheel
      ref={myLucky}
      width="300px"
      height="300px"
      blocks={blocks}
      prizes={prizes}
      buttons={buttons}
      onStart={() => { // 点击抽奖按钮会触发star回调
        myLucky.current.play()
        setTimeout(() => {
          const index = Math.random() * 8 >> 0
          myLucky.current.stop(index)
        }, 2500)
      }}
      onEnd={(prize: any) => { // 抽奖结束会触发end回调
        alert('恭喜你抽到 ' + prize.fonts[0].text + ' 号奖品')
      }}
    />
  </div>;
};

export default LuckyPage;
