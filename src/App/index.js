import React from 'react';
import PropTypes from 'prop-types';
import Editor from '../Editor';
import {Header} from '../Header';
import {Poll} from '../Poll';

import './index.css'

const Index = ({ title }) => (
  <div className='container'>
    <Header />
    <Editor />
  </div>
);

Index.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Index;
