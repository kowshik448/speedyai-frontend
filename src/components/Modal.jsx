import React , {useState,useRef}from 'react'
import KeywordsCard from './KeywordsCard';

function Modal({isOpenModal,setIsOpenModal,setCategoriesList,categoriesList}) {
    const [inputKeyWord , setInputKeyWord] = useState('');
    const [keyWords , setKeyWords] = useState([]);
    const [inputTopicName , setInputTopicname] = useState('');
    const ref = useRef();

    const handleCloseModal = () => {
        setIsOpenModal(false);
        setInputKeyWord('');
        setInputTopicname('');
        setKeyWords([]);
    };

    const handleAddKeyWords = () => {
        setKeyWords((prevKeyWords)=>{
            return [...prevKeyWords,inputKeyWord]
        });
        setInputKeyWord('');
    };

    const handleAddFormDetails = () => {
        const formData = {
            id: new Date().getTime(),
            type: 'Custom',
            title: inputTopicName,
            keyWords: keyWords

        }
        console.log(formData,'fd')
        setCategoriesList((prevCategories)=>{
            return [...prevCategories,formData]
        });
        handleCloseModal();
    };


  return (
    <div className='add_topic' style={{display:`${isOpenModal ? "flex" : "none"}`}} >
        <div className="add_topic_create" ref={ref} >
            Add a new Topic
            <input type="text" name="title" value={inputTopicName} placeholder="Enter the Topic name" onChange={e => setInputTopicname(e.target.value)} required/>
            <div className='keywords_input'>
                <input type="text" name="keyword" value={inputKeyWord} placeholder='Enter the Keywords' onChange={e => setInputKeyWord(e.target.value)} required/>
                <button className='button' onClick={handleAddKeyWords}>add</button>
            </div>
                {
                    <KeywordsCard keywords={keyWords}/>
                }
            <div className='form_buttons'>
                <input type='button' className='button cancel' onClick={handleCloseModal}  value='Cancel'/>
                <input type="submit" className="button" onClick={handleAddFormDetails} value="Submit"/>
            </div>
        </div>
    </div>
  )
}

export default Modal