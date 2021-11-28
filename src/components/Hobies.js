import React, { useState, useContext } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import uniqid from 'uniqid';
import { AppContext } from './Main';

function Hobies() {
  const { previewMode } = useContext(AppContext);
  const [hobiesInfo, setHobiesInfo] = useState({
    hoby: { text: '', editFlag: false, id: uniqid() },
    hobies: [],
  });

  const addHoby = (e) => {
    e.preventDefault();
    const { hobies, hoby } = hobiesInfo;
    setHobiesInfo({
      ...hobiesInfo,
      hobies: [...hobies, hoby],
      hoby: { ...hoby, text: '', id: uniqid() },
    });
  };

  const toggleEdit = (id) => {
    const { hobies } = hobiesInfo;
    const item = hobies.find((obj) => obj.id === id);
    item.editFlag = !item.editFlag;
    setHobiesInfo({
      ...hobiesInfo,
      hobies: hobies,
    });
  };

  const handleChange = (e, id) => {
    const { hobies } = hobiesInfo;
    const item = hobies.find((obj) => obj.id === id);
    item.text = e.target.value;
    setHobiesInfo({
      ...hobiesInfo,
      hobies: hobies,
    });
  };

  const remove = (id) => {
    const { hobies } = hobiesInfo;
    const newhobies = hobies.filter((obj) => obj.id !== id);
    setHobiesInfo({
      ...hobiesInfo,
      hobies: newhobies,
    });
  };

  const showPreview = () => {
    const { hobies } = hobiesInfo;

    return hobies.map((hoby) => {
      const { text, id } = hoby;
      return <h4 key={id}>{text}</h4>;
    });
  };

  const showHobies = () => {
    const { hobies } = hobiesInfo;

    return hobies.map((hoby) => {
      const { text, editFlag, id } = hoby;
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
    const { text } = hobiesInfo.hoby;
    return (
      <div className='form-control'>
        <input
          type='text'
          name='hoby'
          value={text}
          onChange={(e) =>
            setHobiesInfo({
              ...hobiesInfo,
              hoby: { ...hobiesInfo.hoby, text: e.target.value },
            })
          }
        />
        <button className='btn' type='button' onClick={addHoby}>
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
      {showHobies()}
      {formInput()}
    </>
  );
}

export default Hobies;
