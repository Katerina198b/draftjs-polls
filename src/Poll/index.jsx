import React, {useState} from 'react'
import {block} from 'bem-cn';

import './index.css'


const b = block('poll');

const Poll = ({contentState}) => {
  const [data] = useState(contentState.getEntity(contentState.getLastCreatedEntityKey()).getData().data);
  const answers = data.answers.map((el, i) => (
    <li key={i}>
      <input type='radio' id={i} name={el.title} className={b('radio', {'correct': el.isCorrect})}/>
      <label htmlFor={i} className={b('answer')}>{el.title}</label>
      <div className={b('answer-description')}>
        {el.description}
      </div>
    </li>
  ));
  return (
    <div className={b()}>
      <div className={b('inner')}>
        <h1>{data.question}</h1>
        <ul className={b('answers')}>
          {answers}
        </ul>
      </div>
    </div>
  )
};

export {Poll}

