import React from 'react';

const FireBlock = (props) => {
  return (
    <div className='fire'>
      <span> 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 </span>
      {props.children}
      <span> 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 </span>
    </div>
  );
};

export {FireBlock}
