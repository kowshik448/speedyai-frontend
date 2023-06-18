import React, { useState ,useRef  } from 'react';
import JoditEditor from 'jodit-react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import '../App.css';


function TextEditor({setCategoriesList, selectedTopic, setIsEditorOpen, setSelectedTopic}) {
  
  const editor = useRef(null);
  const navigate = useNavigate();
	const [content, setContent] = useState(selectedTopic?.content || '');
  const [inputTopicTitle, setInputTopicTitle] = useState(selectedTopic.title);
  const [tone , setTone] = useState('Professional');

  const TONE_TYPES = ['Professional', 'Friendly', 'Polite', 'Formal', 'in Formal']

  const handleSelectTone = (e) => {
    setTone(e.target.value)
  }

  const handleAddContent = (newContent) => {
    setSelectedTopic((topic) => {
      return {...topic,content:newContent};
  });
    setCategoriesList((prevList)=>{
      return [...prevList,selectedTopic]
    });
  }

  const handleGoBackHome = () => {
    navigate('/')
    setIsEditorOpen(false);
  }

  const fetchData = () => {
    axios.post("http://localhost:8020/chat",{inputTopicTitle})
    .then((res) => {
      console.log(res,'res');
      setContent(res.data);
    })
    .catch((err)=>{
      console.log(err);
    });
  }


  return (
    <div className='text_editor_parent_container'>
      <div className='navbar' onClick={handleGoBackHome}>
        <span class="material-symbols-outlined">arrow_back</span>
        <span>Back</span>
      </div>
      <div className='text_area'>
        <textarea 
        placeholder='Enter your Topic name'
          className='input_text_area'
          value={inputTopicTitle} 
          onChange={(e)=>setInputTopicTitle(e.target.value)}
        />
      </div>
      <div className='text_editor_container'>
        <select name="tone" value={tone} onChange={(e)=>handleSelectTone(e)} className='select_tone'>
          {TONE_TYPES.map((tone_type)=>(
            <option key={tone_type} value={tone_type}>{tone_type}</option>
          ))}
        </select>
        <div className='text_editor'>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={newContent => handleAddContent(newContent)}
            onChange={newContent => setContent(newContent)}
          />
        </div>
        <button className='button' onClick={fetchData}>Generate</button>
      </div>
    </div>
  )
}

export default TextEditor;