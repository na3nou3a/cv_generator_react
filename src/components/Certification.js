import React, { useState, useContext } from 'react';
import uniqid from 'uniqid';
import { AppContext } from './Main';

function Certification() {
  const { previewMode } = useContext(AppContext);
  const [certificationsInfo, setCertificationsInfo] = useState({
    certification: {
      id: uniqid(),
      title: '',
      text: '',
      editFlag: false,
    },
    certifications: [],
    isOpenModel: false,
  });

  const addCertification = (e) => {
    e.preventDefault();
    setCertificationsInfo({
      certifications: [
        ...certificationsInfo.certifications,
        certificationsInfo.certification,
      ],
      certification: {
        id: uniqid(),
        title: '',
        text: '',
        editFlag: false,
      },
      isOpenModel: false,
    });
  };

  const toggleEdit = (id) => {
    const { certifications } = certificationsInfo;
    const item = certifications.find((obj) => obj.id === id);
    item.editFlag = !item.editFlag;
    setCertificationsInfo({
      ...certificationsInfo,
      certifications: [...certifications],
    });
  };

  const handleChange = (e, id) => {
    const { certifications } = certificationsInfo;
    const prop = e.target.name;
    const value = e.target.value;
    const item = certifications.find((obj) => obj.id === id);
    item[prop] = value;
    setCertificationsInfo({
      ...certificationsInfo,
      certifications: [...certifications],
    });
  };

  const remove = (id) => {
    const { certifications } = certificationsInfo;
    const newCertifications = certifications.filter((obj) => obj.id !== id);
    setCertificationsInfo({
      ...certificationsInfo,
      certifications: newCertifications,
    });
  };

  const start = () => {
    const { isOpenModel, certifications } = certificationsInfo;
    if (previewMode) {
      return <>{showPreview()}</>;
    }
    if (isOpenModel) {
      return (
        <>
          {showCertifications()}
          {formInput()}
        </>
      );
    }
    if (!certifications.length) {
      return <>{formInput()}</>;
    }
    return (
      <>
        {showCertifications()}
        <button type='button' className='btn btn-center' onClick={showModel}>
          New Certification
        </button>
      </>
    );
  };

  const showModel = () => {
    setCertificationsInfo({
      ...certificationsInfo,
      isOpenModel: true,
    });
  };

  const showPreview = () => {
    const { certifications } = certificationsInfo;
    return certifications.map((cert) => {
      const { id, title, text } = cert;
      return (
        <div key={id} className='infoCard'>
          <div className='flex'>
            <div className='col first'>
              <h5>{title}: </h5>
            </div>
            <div className='col last'>
              <h4>{text}</h4>
            </div>
          </div>
        </div>
      );
    });
  };

  const showCertifications = () => {
    const { certifications } = certificationsInfo;
    return certifications.map((cert) => {
      const { id, title, text, editFlag } = cert;
      if (!editFlag) {
        return (
          <div key={id} className='infoCard'>
            <div className='flex'>
              <div className='col first'>
                <h5>{title}: </h5>
              </div>
              <div className='col last'>
                <h4>{text}</h4>
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
            <label htmlFor='title'>Title: </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Programming Languages'
              value={title}
              onChange={(e) => handleChange(e, id)}
            />
          </div>
          <div className='flex'>
            <label htmlFor='text'>Certification / Certifications: </label>
            <input
              type='text'
              name='text'
              id='text'
              placeholder='Html, Css, JavaScript, PHP'
              value={text}
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
      setCertificationsInfo({
        ...certificationsInfo,
        certification: { ...certificationsInfo.certification, [prop]: value },
      });
    };
    const { title, text } = certificationsInfo.certification;
    return (
      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <div className='flex'>
          <label htmlFor='title'>Title: </label>
          <input
            type='text'
            name='title'
            id='title'
            placeholder='Programming Languages'
            value={title}
            onChange={change}
          />
        </div>
        <div className='flex'>
          <label htmlFor='text'>Certification / Certifications: </label>
          <input
            type='text'
            name='text'
            id='text'
            placeholder='Html, Css, JavaScript, PHP'
            value={text}
            onChange={change}
          />
        </div>
        <button
          className='btn btn-center'
          type='button'
          onClick={addCertification}
        >
          add certification
        </button>
      </form>
    );
  };

  return <>{start()}</>;
}

export default Certification;
