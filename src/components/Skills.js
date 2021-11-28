import React, { useState, useContext } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import uniqid from 'uniqid';
import { AppContext } from './Main';

function Skills() {
  const { previewMode } = useContext(AppContext);
  const [skillsInfo, setSkillsInfo] = useState({
    skill: { text: '', editFlag: false, id: uniqid() },
    skills: [],
  });

  const addSkill = (e) => {
    e.preventDefault();
    const { skills, skill } = skillsInfo;
    setSkillsInfo({
      ...skillsInfo,
      skills: [...skills, skill],
      skill: { ...skill, text: '', id: uniqid() },
    });
  };

  const toggleEdit = (id) => {
    const { skills } = skillsInfo;
    const item = skills.find((obj) => obj.id === id);
    item.editFlag = !item.editFlag;
    setSkillsInfo({
      ...skillsInfo,
      skills: skills,
    });
  };

  const handleChange = (e, id) => {
    const { skills } = skillsInfo;
    const item = skills.find((obj) => obj.id === id);
    item.text = e.target.value;
    setSkillsInfo({
      ...skillsInfo,
      skills: skills,
    });
  };

  const remove = (id) => {
    const { skills } = skillsInfo;
    const newSkills = skills.filter((obj) => obj.id !== id);
    setSkillsInfo({
      ...skillsInfo,
      skills: newSkills,
    });
  };

  const showPreview = () => {
    const { skills } = skillsInfo;

    return skills.map((skill) => {
      const { text, id } = skill;
      return <h4 key={id}>{text}</h4>;
    });
  };

  const showSkills = () => {
    const { skills } = skillsInfo;

    return skills.map((skill) => {
      const { text, editFlag, id } = skill;
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
    const { text } = skillsInfo.skill;
    return (
      <div className='form-control'>
        <input
          type='text'
          name='skill'
          value={text}
          onChange={(e) =>
            setSkillsInfo({
              ...skillsInfo,
              skill: { ...skillsInfo.skill, text: e.target.value },
            })
          }
        />

        <button className='btn' type='button' onClick={addSkill}>
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
      {showSkills()}
      {formInput()}
    </>
  );
}

export default Skills;
