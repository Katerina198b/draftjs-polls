import React from 'react';

const StyleButton = ({active, label, style, onToggle}) => {

  const onMouseDown = e => {
    e.preventDefault();
    onToggle(style);
  };

  let className = 'RichEditor-styleButton';
  if (active) {
    className += ' RichEditor-activeButton';
  }

  return (
    <span className={className} onMouseDown={onMouseDown}>
      {label}
    </span>
  );

};

export {StyleButton}
