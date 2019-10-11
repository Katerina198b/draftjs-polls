import React from 'react';
import ReactDOM from 'react-dom';

import Index from './App';

const title = 'React with Webpack and Babel';

ReactDOM.render(
  <Index title={title} />,
  document.getElementById('app')
);

module.hot.accept();
