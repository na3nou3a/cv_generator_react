import React from 'react';
import Personal from './Personal';
import Experience from './Experience';
import Hobies from './Hobies';
import Skills from './Skills';
import Languages from './Languages';
import Education from './Education';
import Certification from './Certification';

const CvBody = () => {
  return (
    <div className='cv-body'>
      <LeftSide />
      <RightSide />
    </div>
  );
};

const LeftSide = () => {
  return (
    <div className='left-side side'>
      <div className='comp'>
        <Title text='About' />
        <Personal />
      </div>
      <div className='comp'>
        <Title text='skills' />
        <Skills />
      </div>
      <div className='comp'>
        <Title text='languages' />
        <Languages />
      </div>
      <div className='comp'>
        <Title text='hobies' />
        <Hobies />
      </div>
    </div>
  );
};

const RightSide = () => {
  return (
    <div className='right-side side'>
      <div className='comp'>
        <Title text='Experience' />
        <Experience />
      </div>
      <div className='comp'>
        <Title text='education' />
        <Education />
      </div>
      <div className='comp'>
        <Title text='certifications' />
        <Certification />
      </div>
    </div>
  );
};

const Title = ({ text }) => <h2 className='title'>{text}</h2>;

export default CvBody;
