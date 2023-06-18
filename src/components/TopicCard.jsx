import React from 'react';
import '../App.css';
import KeywordsCard from './KeywordsCard';

function TopicCard({topic , handleDeleteTopic, handleWriteBlog}) {

  return (
    <div className='topic_card_container'>
        <div className='topic_card'>
            <span>{topic.title}</span>
            <KeywordsCard keywords={topic.keyWords}/>
        </div>
        <div className='topic_card_buttons'>
          <button className='button write' onClick={()=>handleWriteBlog(topic)}>
            <span >Write</span>
            <span class="material-icons">chevron_right</span>
          </button>
          <span class="material-icons" onClick={() => handleDeleteTopic(topic.id)}>delete_outline</span>
        </div>

    </div>
  )
}

export default TopicCard