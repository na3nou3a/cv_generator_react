import React, { forwardRef } from 'react';
import CvBody from './CvBody';
import CvHeader from './CvHeader';

const Cv = forwardRef((props, ref) => {
  return (
    <div className='cv-container' ref={ref}>
      <CvHeader />
      <CvBody />
    </div>
  );
});

export default Cv;
