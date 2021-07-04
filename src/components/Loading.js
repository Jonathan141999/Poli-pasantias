import React from 'react';
import '../theme/loading.css';

const Loading = () => (
  <div className='spinner'>
    <div className='blob top' />
    <div className='blob bottom' />
    <div className='blob left' />

    <div className='blob move-blob' />
  </div>
);

export default Loading;
