import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {block} from 'bem-cn';

import './index.css'
import {ModalHeader} from './ModalHeader';

const b = block('modal');
function Modal ({isOpen: isOpen, children, onClose, title}) {

  return (
    <div className={b({open: isOpen, title})}>
      <div className='modal__background'>
        <div className='modal__content'>
          <ModalHeader>{title}</ModalHeader>
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  show: PropTypes.bool
};

Modal.defaultProps = {
  show: false
};

export {Modal}
