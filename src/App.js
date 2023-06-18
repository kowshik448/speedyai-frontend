import './App.css';
// import CategoriesPage from './components/CategoriesPage';
import {Routes, Route} from 'react-router-dom'
import TextEditor from './components/TextEditor';
import React, { useEffect, useState } from 'react';
import TopicCard from './components/TopicCard';
import { getCategories as getCategoriesApi } from './api';
import Modal from './components/Modal';
import {useNavigate} from 'react-router-dom';


function App() {
    const [categoriesList , setCategoriesList] = useState();    
    const [filteredcategoriesList , setfilteredcategoriesList] = useState(categoriesList);  
    const [categoryType , setcategoryType] = useState("All"); 
    const [isOpenModal , setIsOpenModal] = useState(false); 
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState();
    const CATEGORY_TYPES = ["All", "Custom", "ICP", "Mission", "Product"];
    const navigate = useNavigate();

    useEffect(()=>{
        getCategoriesApi().then((data) =>{
            setCategoriesList(data);
            setfilteredcategoriesList(data);
        })
    },[]);

    const handleChangeCategory = (category) => {
        setcategoryType(category);
        if (category != "All"){
            const updatedfilteredcategoriesList = categoriesList.filter((topic ) => topic.type == category);
            setfilteredcategoriesList(updatedfilteredcategoriesList);
        }
        else {
            setfilteredcategoriesList(categoriesList);
        }
    }

    const handleDeleteTopic = (topicId) => {
        const updatedcategoriesList = categoriesList.filter((topic ) => topic.id != topicId);
        setCategoriesList(updatedcategoriesList);
    }

    const handleOpenModal = () => {
        setIsOpenModal(true);
    }

    const handleWriteBlog = (topic) => {
      setIsEditorOpen(true);
      setSelectedTopic(topic);
      navigate(`/editor/${topic.id}`);
    }

    useEffect(() => {
        handleChangeCategory(categoryType)
    },[categoriesList]);


  return (
    <>
      {isEditorOpen ? 
        <TextEditor 
          selectedTopic={selectedTopic} 
          setSelectedTopic={setSelectedTopic}
          setCategoriesList={setCategoriesList}
          setIsEditorOpen={setIsEditorOpen}
        />:
    <div className='main_container'>
        <h1 className='title'>Categories</h1>
        <div className='header'>
            <div className='header_categories'>
                {CATEGORY_TYPES.map((category)=>(
                    <span key={category} className={`${category == categoryType ? "selected" : ""} `} onClick={() => handleChangeCategory(category)}>{category}</span>
                ))}
            </div>
            <button className='button' onClick={handleOpenModal}>
                <span>Add topic</span>
                <span class="material-icons">chevron_right</span>
            </button>
        </div>
        <div className='topics_container'>
            <div className='recommended_topics'>Recommended Topics</div>
            {filteredcategoriesList && filteredcategoriesList.length>0  ? filteredcategoriesList.map((topic) => (
                <TopicCard  key={topic.id} topic={topic} handleDeleteTopic={handleDeleteTopic} handleWriteBlog={handleWriteBlog}/>
            )): <div className='custom_category'>you are yet to create one , let's go! 🎯</div>}
        </div>
    </div>}
    {isOpenModal && 
        <Modal 
            setIsOpenModal={setIsOpenModal}
            setCategoriesList={setCategoriesList}
            isOpenModal={isOpenModal}
            categoriesList={categoriesList}
        />
    }
    </>
  )
  
}

export default App;