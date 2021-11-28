import React, { useState, useContext } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import uniqid from 'uniqid';
import { AppContext } from './Main';

function Languages() {
  const { previewMode } = useContext(AppContext);
  const [languagesInfo, setLanguagesInfo] = useState({
    language: { text: '', editFlag: false, id: uniqid() },
    languages: [],
  });

  const addLanguage = (e) => {
    e.preventDefault();
    const { languages, language } = languagesInfo;
    setLanguagesInfo({
      ...languagesInfo,
      languages: [...languages, language],
      language: { ...language, text: '', id: uniqid() },
    });
  };

  const toggleEdit = (id) => {
    const { languages } = languagesInfo;
    const item = languages.find((obj) => obj.id === id);
    item.editFlag = !item.editFlag;
    setLanguagesInfo({
      ...languagesInfo,
      languages: languages,
    });
  };

  const handleChange = (e, id) => {
    const { languages } = languagesInfo;
    const item = languages.find((obj) => obj.id === id);
    item.text = e.target.value;
    setLanguagesInfo({
      ...languagesInfo,
      languages: languages,
    });
  };

  const remove = (id) => {
    const { languages } = languagesInfo;
    const newlanguages = languages.filter((obj) => obj.id !== id);
    setLanguagesInfo({
      ...languagesInfo,
      languages: newlanguages,
    });
  };

  const showPreview = () => {
    const { languages } = languagesInfo;

    return languages.map((language) => {
      const { text, id } = language;
      return <h4 key={id}>{text}</h4>;
    });
  };

  const showLanguages = () => {
    const { languages } = languagesInfo;

    return languages.map((language) => {
      const { text, editFlag, id } = language;

      if (!editFlag) {
        return (
          <div key={id} className='info'>
            <div className='flex'>
              <h4>{text}</h4>
              <button
                className='icon edit'
                type='button'
                onClick={() => toggleEdit(id)}
              >
                <FaEdit />
              </button>
              <button
                className='icon remove'
                type='button'
                onClick={() => remove(id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      }

      return (
        <div key={id} className='form-control'>
          <input
            type='text'
            name='edit'
            value={text}
            onChange={(e) => handleChange(e, id)}
          />
          <button
            className='icon save'
            type='button'
            onClick={() => toggleEdit(id)}
          >
            <FaSave />
          </button>
        </div>
      );
    });
  };

  const formInput = () => {
    const { text } = languagesInfo.language;
    return (
      <div className='form-control'>
        <input
          type='text'
          name='language'
          value={text}
          onChange={(e) =>
            setLanguagesInfo({
              ...languagesInfo,
              language: { ...languagesInfo.language, text: e.target.value },
            })
          }
        />
        <button className='btn' type='button' onClick={addLanguage}>
          add
        </button>
      </div>
    );
  };
  if (previewMode) {
    return <>{showPreview()}</>;
  }
  return (
    <>
      {showLanguages()}
      {formInput()}
    </>
  );
}

export default Languages;
