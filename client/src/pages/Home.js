import React from 'react';
import coverImage from '../assets/coffee1.jpg';

export default function Home() {
  return (
    <div className='columns is-centered'>
      <div className='column'>
        <div className='content has-background-black'>
          <h1 className='has-text-white has-text-centered'>Start your Black Coffee Journey</h1>
          <img
            className='is-align-items-center'
            src={coverImage}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
            alt={coverImage}
          />
        </div>
      </div>
    </div>
  );
}
