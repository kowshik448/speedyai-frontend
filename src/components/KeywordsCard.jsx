import React from 'react'
import { getRandInteger } from '../Utils/getRandomInteger';

function KeywordsCard({keywords}) {

  return (
    <div className='keywords_container'> 
        {keywords && keywords.map((keyword)=>{
        const randInt_red = getRandInteger(0,255);
        const randInt_green = getRandInteger(0,255);
        const randInt_blue = getRandInteger(0,255);
        return (
            <span key={keyword}
            className='keyword'
            style={{
                backgroundColor:`rgba(${randInt_red},${randInt_green},${randInt_blue},0.2)`,
                color:`rgba(${randInt_red},${randInt_green},${randInt_blue},1)`,
                border:`1px solid rgba(${randInt_red},${randInt_green},${randInt_blue},1)`
            }}
            >
            {keyword}
            </span>
        )
        })}
    </div>
  )
}

export default KeywordsCard