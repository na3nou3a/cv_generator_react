import React, { useState, useContext } from 'react';
import { AppContext } from './Main';

function Personal() {
  const { previewMode } = useContext(AppContext);
  const [info, setInfo] = useState({
    gender: 'Male',
    birthday: '11/12/1989',
    status: 'Single',
    tel: '+44 (0)20 7666 8555',
    email: 'example@gmail.com',
    adress: '120 Great Portland Street London W2W 6tQ',
    editFlag: false,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const prop = e.target.name;
    setInfo({
      ...info,
      [prop]: value,
    });
  };

  if (previewMode) {
    return (
      <div className='personal'>
        <div>
          <h4>Gender:</h4>
          <h5>{info.gender}</h5>
        </div>
        <div>
          <h4>Staus:</h4>
          <h5>{info.status}</h5>
        </div>
        <div>
          <h4>Birthday:</h4>
          <h5>{info.birthday}</h5>
        </div>
        <div>
          <h4>tel:</h4>
          <h5>{info.tel}</h5>
        </div>
        <div>
          <h4>Email:</h4>
          <h5>{info.email}</h5>
        </div>
        <div>
          <h4>Adress:</h4>
          <h5>{info.adress}</h5>
        </div>
      </div>
    );
  }

  if (!info.editFlag) {
    return (
      <div className='personal'>
        <div>
          <h4>Gender:</h4>
          <h5>{info.gender}</h5>
        </div>
        <div>
          <h4>Staus:</h4>
          <h5>{info.status}</h5>
        </div>
        <div>
          <h4>Birthday:</h4>
          <h5>{info.birthday}</h5>
        </div>
        <div>
          <h4>tel:</h4>
          <h5>{info.tel}</h5>
        </div>
        <div>
          <h4>Email:</h4>
          <h5>{info.email}</h5>
        </div>
        <div>
          <h4>Adress:</h4>
          <h5>{info.adress}</h5>
        </div>
        <button
          type='button'
          className='btn btn-center'
          onClick={() => setInfo({ ...info, editFlag: !info.editFlag })}
        >
          edit
        </button>
      </div>
    );
  }

  return (
    <form className='form' onSubmit={(e) => e.preventDefault()}>
      <div className='flex'>
        <label htmlFor='gender'>Gender: </label>
        <input
          type='text'
          name='gender'
          id='gender'
          value={info.gender}
          onChange={handleChange}
        />
      </div>
      <div className='flex'>
        <label htmlFor='birthday'>Birthday: </label>
        <input
          type='text'
          name='birthday'
          id='birthday'
          value={info.birthday}
          onChange={handleChange}
        />
      </div>
      <div className='flex'>
        <label htmlFor='status'>Status: </label>
        <input
          type='text'
          name='status'
          id='status'
          value={info.status}
          onChange={handleChange}
        />
      </div>
      <div className='flex'>
        <label htmlFor='tel'>tel Number: </label>
        <input
          type='tel'
          name='tel'
          id='tel'
          value={info.tel}
          onChange={handleChange}
        />
      </div>
      <div className='flex'>
        <label htmlFor='email'>Email Adress: </label>
        <input
          type='text'
          name='email'
          id='email'
          value={info.email}
          onChange={handleChange}
        />
      </div>

      <div className='flex'>
        <label htmlFor='adress'>Adress: </label>
        <input
          type='text'
          name='adress'
          id='adress'
          value={info.adress}
          onChange={handleChange}
        />
      </div>
      <button
        type='submit'
        className='btn .btn-center'
        onClick={() => setInfo({ ...info, editFlag: !info.editFlag })}
      >
        save
      </button>
    </form>
  );
}

export default Personal;
