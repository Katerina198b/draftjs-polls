import React from 'react'
import {block} from 'bem-cn';
const b = block('modal');

function ModalHeader ({children}) {
  return (
    <header className={b('header')}>
      {children}
    </header>
  )
}

export {ModalHeader}
