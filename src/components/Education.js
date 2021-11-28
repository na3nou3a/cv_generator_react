import React, { useState, useContext } from 'react';
import uniqid from 'uniqid';
import { AppContext } from './Main';

function Education() {
  const { previewMode } = useContext(AppContext);
  const [educationsInfo, setEducationsInfo] = useState({
    education: {
      id: uniqid(),
      school: '',
      degree: '',
      location: '',
      from: '',
      to: '',
      editFlag: false,
    },
    educations: [],
    isOpenModel: false,
  });

  const addEducation = (e) => {
    e.preventDefault();
    setEducationsInfo({
      educations: [...educationsInfo.educations, educationsInfo.education],
      education: {
        id: uniqid(),
        school: '',
        degree: '',
        location: '',
        from: '',
        to: '',
        editFlag: false,
      },
      isOpenModel: false,
    });
  };

  const toggleEdit = (id) => {
    const { educations } = educationsInfo;
    const item = educations.find((obj) => obj.id === id);
    item.editFlag = !item.editFlag;
    setEducationsInfo({
      ...educationsInfo,
      educations: [...educations],
    });
  };

  const handleChange = (e, id) => {
    const { educations } = educationsInfo;
    const prop = e.target.name;
    const value = e.target.value;
    const item = educations.find((obj) => obj.id === id);
    item[prop] = value;
    setEducationsInfo({
      ...educationsInfo,
      educations: [...educations],
    });
  };

  const remove = (id) => {
    const { educations } = educationsInfo;
    const newEducations = educations.filter((obj) => obj.id !== id);
    setEducationsInfo({
      ...educationsInfo,
      educations: newEducations,
    });
  };

  const start = () => {
    const { isOpenModel, educations } = educationsInfo;
    if (previewMode) {
      return <>{showPreview()}</>;
    }
    if (isOpenModel) {
      return (
        <>
          {showEducations()}
          {formInput()}
        </>
      );
    }
    if (!educations.length) {
      return <>{formInput()}</>;
    }
    return (
      <>
        {showEducations()}
        <button type='button' className='btn btn-center' onClick={showModel}>
          New Education
        </button>
      </>
    );
  };

  const showModel = () => {
    setEducationsInfo({
      ...educationsInfo,
      isOpenModel: true,
    });
  };

  const showPreview = () => {
    const { educations } = educationsInfo;
    return educations.map((edu) => {
      const { id, school, degree, location, from, to } = edu;
      return (
        <div key={id} className='infoCard'>
          <div className='flex'>
            <div className='col first'>
              <h4>{degree}</h4>
              <h5>
                {from} - {to}
              </h5>
            </div>
            <div className='col last'>
              <h4>{school}</h4>
              <h5>{location}</h5>
            </div>
          </div>
        </div>
      );
    });
  };

  const showEducations = () => {
    const { educations } = educationsInfo;
    return educations.map((edu) => {
      const { id, school, degree, location, from, to, editFlag } = edu;
      if (!editFlag) {
        return (
          <div key={id} className='infoCard'>
            <div className='flex'>
              <div className='col first'>
                <h4>{degree}</h4>
                <h5>
                  {from} - {to}
                </h5>
              </div>
              <div className='col last'>
                <h4>{school}</h4>
                <h5>{location}</h5>
              </div>
            </div>
            <div className='btn-groupe'>
              <button
                className='btn'
                type='button'
                onClick={() => toggleEdit(id)}
              >
                edit
              </button>
              <button className='btn' type='button' onClick={() => remove(id)}>
                remove
              </button>
            </div>
          </div>
        );
      }

      return (
        <div key={id} className='info'>
          <div className='flex'>
            <label htmlFor='degree'>Degree: </label>
            <input
              type='text'
              name='degree'
              id='degree'
              value={degree}
              onChange={(e) => handleChange(e, id)}
            />
          </div>
          <div className='flex'>
            <label htmlFor='school'>School: </label>
            <input
              type='text'
              name='school'
              id='school'
              value={school}
              onChange={(e) => handleChange(e, id)}
            />
          </div>
          <div className='flex'>
            <label htmlFor='location'>Location: </label>
            <input
              type='text'
              name='location'
              id='location'
              value={location}
              onChange={(e) => handleChange(e, id)}
            />
          </div>
          <div className='flex'>
            <label htmlFor='from'>From: </label>
            <input
              type='text'
              name='from'
              id='from'
              value={from}
              onChange={(e) => handleChange(e, id)}
            />
          </div>
          <div className='flex'>
            <label htmlFor='to'>To: </label>
            <input
              type='text'
              name='to'
              id='to'
              value={to}
              onChange={(e) => handleChange(e, id)}
            />
          </div>
          <button
            className='btn btn-center'
            type='button'
            onClick={() => toggleEdit(id)}
          >
            save
          </button>
        </div>
      );
    });
  };

  const formInput = () => {
    const change = (e) => {
      const prop = e.target.name;
      const value = e.target.value;
      setEducationsInfo({
        ...educationsInfo,
        education: { ...educationsInfo.education, [prop]: value },
      });
    };
    const { school, degree, location, from, to } = educationsInfo.education;
    return (
      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <div className='flex'>
          <label htmlFor='degree'>Degree: </label>
          <input
            type='text'
            name='degree'
            id='degree'
            placeholder='Design'
            value={degree}
            onChange={change}
          />
        </div>
        <div className='flex'>
          <label htmlFor='school'>School: </label>
          <input
            type='text'
            name='school'
            id='school'
            placeholder='Cool University'
            value={school}
            onChange={change}
          />
        </div>
        <div className='flex'>
          <label htmlFor='location'>Location: </label>
          <input
            type='text'
            name='location'
            id='location'
            placeholder='London'
            value={location}
            onChange={change}
          />
        </div>
        <div className='flex'>
          <label htmlFor='from'>From: </label>
          <input
            type='text'
            name='from'
            id='from'
            placeholder='April 2020'
            value={from}
            onChange={change}
          />
        </div>
        <div className='flex'>
          <label htmlFor='to'>To: </label>
          <input
            type='text'
            name='to'
            placeholder='Jully 2020'
            id='to'
            value={to}
            onChange={change}
          />
        </div>
        <button className='btn btn-center' type='button' onClick={addEducation}>
          add education
        </button>
      </form>
    );
  };

  return <>{start()}</>;
}

export default Education;
