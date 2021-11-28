import React, { useState, useContext } from 'react';
import emptyAvatar from '../empty_avatar.png';
import { AppContext } from './Main';

const CvHeader = () => {
  return (
    <div className='cv-header'>
      <Avatar />
      <Identity />
    </div>
  );
};

const Avatar = () => {
  const { previewMode } = useContext(AppContext);
  const [avatar, setAvatar] = useState(emptyAvatar);

  const handleChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  if (previewMode) {
    return (
      <div className='avatar'>
        <img src={avatar} alt='avatar' />
      </div>
    );
  }
  return (
    <div className='avatar'>
      <input type='file' onChange={handleChange} />
      <img src={avatar} alt='avatar' />
    </div>
  );
};

const Identity = () => {
  const { previewMode } = useContext(AppContext);
  const [header, setHeader] = useState({
    firstName: 'JOHN',
    lastName: 'DOE',
    title: 'Web Designer',
    profile:
      'Describe in a few lines your career path, your key skills for the position and your career goals. This is actually an introduction to your cover letter. Describe in a few lines your career path, your key skills for the position and your career goals. This is actually an introduction to your cover letter.',
    editFlag: false,
  });

  const handleChange = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setHeader({
      ...header,
      [prop]: value,
    });
  };

  const toggleEdit = () => {
    setHeader({
      ...header,
      editFlag: !header.editFlag,
    });
  };

  const showHeader = () => {
    const { firstName, lastName, title, profile, editFlag } = header;
    if (previewMode) {
      return (
        <div className='identity'>
          <h1>
            {firstName} <span>{lastName}</span>
          </h1>
          <h2>{title}</h2>
          <div className='underline'></div>
          <p>{profile}</p>
        </div>
      );
    }
    if (!editFlag) {
      return (
        <>
          <div className='identity'>
            <h1>
              {firstName} <span>{lastName}</span>
            </h1>
            <h2>{title}</h2>
            <div className='underline'></div>
            <p>{profile}</p>
            <button
              type='button'
              className='btn btn-center'
              onClick={toggleEdit}
            >
              edit
            </button>
          </div>
        </>
      );
    }
    return (
      <>
        <form className='form' onSubmit={(e) => e.preventDefault()}>
          <div className='flex'>
            <label htmlFor='first'>First Name: </label>
            <input
              type='text'
              name='firstName'
              id='first'
              value={firstName}
              onChange={handleChange}
            />
          </div>
          <div className='flex'>
            <label htmlFor='last'>Last Name: </label>
            <input
              type='text'
              name='lastName'
              id='last'
              value={lastName}
              onChange={handleChange}
            />
          </div>
          <div className='flex'>
            <label htmlFor='title'>Your Title: </label>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              onChange={handleChange}
            />
          </div>

          <div className='flex'>
            <label htmlFor='profile'>Profile: </label>
            <textarea
              name='profile'
              id='profile'
              value={profile}
              cols='30'
              rows='10'
              onChange={handleChange}
            ></textarea>
          </div>

          <button type='submit' className='btn btn-center' onClick={toggleEdit}>
            save
          </button>
        </form>
      </>
    );
  };

  return <>{showHeader()}</>;
};

export default CvHeader;
