import React, {useState} from 'react';
import {block} from 'bem-cn';

import './index.css';
import {Modal} from '../Modal';

const b = block('item');

const PollModal = ({isOpen, onClose, onSubmit}) => {
  const [data, setData] = useState({
    question: '',
    answers: [{
      title: '',
      description: '',
      isCorrect: false,
    }],
  });

  const onQuestionChange = (e) => {
    data.question = e.target.value;
    setData(Object.assign({}, data));
  };

  const addAnswer = () => {
    if (!data.answers.some(el => el.title === '')) {
      data.answers.push(
        {
          title: '',
          description: '',
          isCorrect: false,
        }
      );
    }
    setData(Object.assign({}, data));
  };

  const onAnswerChange = (e, i) => {
    data.answers[i].title = e.target.value;
    setData(Object.assign({}, data));
  };

  const onDescriptionChange = (e, i) => {
    data.answers[i].description = e.target.value;
    setData(Object.assign({}, data));
  };

  const onIsCorrectChange = (e, i) => {
    data.answers[i].isCorrect = e.target.checked;
    setData(Object.assign({}, data));
  };

  /*  const onChangeAnswer = (e) => {
      data.question
    };*/

  console.log(isOpen);

  return (
   <Modal
     isOpen={isOpen}
     onClose={onClose}
     title={'Вопрос'}
   >
      <div className={b()}>
        <input value={data.question}
               onChange={onQuestionChange}
               className={b('input')}
        />
      </div>
     <div className={'modal__body'}>
      {data.answers.map((el, i) => (
        <div
          className={b({type: el.isCorrect ? 'correct' : 'wrong'})}
          key={i}
        >
          <div>
            <label className={b('label')}> Ответ {i + 1}: </label>
            <input
              value={el.title}
              className={b('input')}
              onChange={(e) => onAnswerChange(e, i)}
            />
          </div>
          <div>
            <label className={b('label')}> Описание: </label>
            <input
              value={el.description}
              className={b('input')}
              onChange={(e) => onDescriptionChange(e, i)}
            />
          </div>
          <div>
            <label className={b('label')}> Ответ верный </label>
            <input type='checkbox' onClick={(e) => onIsCorrectChange(e, i)}/>
          </div>
        </div>
      ))}
     </div>
     <div className='d-flex row_between'>
       <button className='button'
               onClick={() => onSubmit(data)}
       >
         Готово
       </button>
       <button className='button button_icon'
               onClick={addAnswer}
       >
         +
       </button>
     </div>
   </Modal>
  );

};

export {PollModal};




