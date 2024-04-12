/** @format */

import React, {  useState } from 'react';
import '../styles/creativeDrawerstyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { setContentFunction } from '../store/action';


export default function CreativeDrawer({onhandleDoneClick,handleClose}) {
  const dispatch = useDispatch()
  const [selectedColor, setSelectedColor] = useState('');
  const [creativeCreation, setCreativeCreation] = useState({
    title:'',
    subTitle:''
  });
  const {colors} = useSelector(state=> state.getColorReducer.colors);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setCreativeCreation({
      ...creativeCreation,
      [name] :value
    })
  };

  const handleCreateCreativeCreation = () => {
    if(creativeCreation.title && creativeCreation.subTitle && selectedColor !== '' ) {
      const newCreation = { ...creativeCreation, color: selectedColor };
      dispatch(setContentFunction(newCreation))
      if (typeof onhandleDoneClick === 'function') {
        onhandleDoneClick();
      }
      handleClose()
    }
  };
  
  return (
    <div>
      <div className='title-container'>
        <p className='input-title'>title</p>
        <input
          type='text'
          placeholder='title'
          name='title'
          value={creativeCreation.title}
          onChange={(e) => handleChange(e)}
        />
        <p className='input-title'>Subtitle</p>
        <input
          type='text'
          placeholder='subTitle'
          name='subTitle'
          value={creativeCreation.subTitle}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className='sec-2-contianer'>
        <div className='color-container'>
          <p>background Color</p>
          <div className='color-picker'>
            {colors?.map((color) => {
              return (
                <>
                  <div
                  key={color}
                    className={`color-dot ${selectedColor === color ? 'active' : ''}` }
                    style={{
                      backgroundColor: `${color}`,
                      border: '1px solid #000',
                    }}
                    onClick={() => handleColorClick(`${color}`)}></div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className='compleate-btn'>
        <button onClick={handleCreateCreativeCreation} >Done</button>
      </div>
    </div>
  );
}
