import React, { useState, useContext } from 'react';
import uniqid from 'uniqid';
import { AppContext } from './Main';

function Experience() {
  const { previewMode } = useContext(AppContext);
  const [experiencesInfo, setExperiencesInfo] = useState({
    experience: {
      id: uniqid(),
      role: '',
      company: '',
      from: '',
      to: '',
      description: '',
      editFlag: false,
    },
    experiences: [],
    isOpenModel: false,
  });

  const addExperience = (e) => {
    e.preventDefault();
    setExperiencesInfo({
      experiences: [...experiencesInfo.experiences, experiencesInfo.experience],
      experience: {
        id: uniqid(),
        role: '',
        company: '',
        from: '',
        to: '',
        description: '',
        editFlag: false,
      },
      isOpenModel: false,
    });
  };

  const toggleEdit = (id) => {
    const { experiences } = experiencesInfo;
    const item = experiences.find((obj) => obj.id === id);
    item.editFlag = !item.editFlag;
    setExperiencesInfo({
      ...experiencesInfo,
      experiences: [...experiences],
    });
  };

  const handleChange = (e, id) => {
    const { experiences } = experiencesInfo;
    const prop = e.target.name;
    const value = e.target.value;
    const item = experiences.find((obj) => obj.id === id);
    item[prop] = value;
    setExperiencesInfo({
      ...experiencesInfo,
      experiences: [...experiences],
    });
  };

  const remove = (id) => {
    const { experiences } = experiencesInfo;
    const newExperiences = experiences.filter((obj) => obj.id !== id);
    setExperiencesInfo({
      ...experiencesInfo,
      experiences: newExperiences,
    });
  };

  const start = () => {
    const { isOpenModel, experiences } = experiencesInfo;
    if (previewMode) {
      return <>{showPreview()}</>;
    }
    if (isOpenModel) {
      return (
        <>
          {showExperiences()}
          {formInput()}
        </>
      );
    }
    if (!experiences.length) {
      return <>{formInput()}</>;
    }
    return (
      <>
        {showExperiences()}
        <button type='button' className='btn btn-center' onClick={showModel}>
          New Experience
        </button>
      </>
    );
  };

  const showModel = () => {
    setExperiencesInfo({
      ...experiencesInfo,
      isOpenModel: true,
    });
  };

  const showPreview = () => {
    const { experiences } = experiencesInfo;
    return experiences.map((exp) => {
      const { id, role, company, description, from, to } = exp;
      return (
        <div key={id} className='infoCard'>
          <div className='flex'>
            <div className='col first'>
              <h4>{role}</h4>
              <h5>
                {from} - {to}
              </h5>
            </div>
            <div className='col last'>
              <h4>{company}</h4>
              <p>{description}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  const showExperiences = () => {
    const { experiences } = experiencesInfo;
    return experiences.map((exp) => {
      const { id, role, company, description, from, to, editFlag } = exp;
      if (!editFlag) {
        return (
          <div key={id} className='infoCard'>
            <div className='flex'>
              <div className='col first'>
                <h4>{role}</h4>
                <h5>
                  {from} - {to}
                </h5>
              </div>

              <div className='col last'>
                <h4>{company}</h4>
                <p>{description}</p>
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
            <label htmlFor='role'>Role: </label>
            <input
              type='text'
              name='role'
              id='role'
              value={role}
              onChange={(e) => handleChange(e, id)}
            />
          </div>
          <div className='flex'>
            <label htmlFor='company'>Company: </label>
            <input
              type='text'
              name='company'
              id='company'
              value={company}
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
          <div className='col'>
            <label htmlFor='description'>Description or Achievements: </label>
            <textarea
              name='description'
              id='description'
              cols='30'
              rows='10'
              value={description}
              onChange={(e) => handleChange(e, id)}
            ></textarea>
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
      setExperiencesInfo({
        ...experiencesInfo,
        experience: { ...experiencesInfo.experience, [prop]: value },
      });
    };
    const { role, company, description, from, to } = experiencesInfo.experience;
    return (
      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <div className='flex'>
          <label htmlFor='role'>Role: </label>
          <input
            type='text'
            name='role'
            id='role'
            required='required'
            placeholder='Web Developper'
            value={role}
            onChange={change}
          />
        </div>
        <div className='flex'>
          <label htmlFor='company'>Company: </label>
          <input
            type='text'
            name='company'
            id='company'
            placeholder='CompanyX'
            value={company}
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
            id='to'
            placeholder='Jully 2020'
            value={to}
            onChange={change}
          />
        </div>
        <div className='col'>
          <label htmlFor='description'>Description or Achievements: </label>
          <textarea
            name='description'
            id='description'
            cols='30'
            rows='10'
            value={description}
            onChange={change}
          ></textarea>
        </div>
        <button
          className='btn btn-center'
          type='submit'
          onClick={addExperience}
        >
          add experience
        </button>
      </form>
    );
  };

  return <>{start()}</>;
}

export default Experience;
