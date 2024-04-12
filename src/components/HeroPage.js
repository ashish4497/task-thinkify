/** @format */

import React, { useEffect, useState } from 'react';
import '../styles/heroPageStyle.css';
import CreativeDrawer from './CreativeDrawer';
import { fetchData } from '../store/action'; 
import { useDispatch, useSelector } from 'react-redux';

export default function HeroPage() {
  const [title, setTitle] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const {colors} =  useSelector(state => state.getColorReducer.colors)
  const creationContent  =  useSelector(state => state.getColorReducer.creativeCreation)


  const toggleDrawer = () => {
    if(creationContent.length !== 5) {
      setIsOpen(!isOpen);
    }
  };

  const handleClose = () => {
    setIsOpen(false)
  }



  const handleChange = (e) => {
    const name = e.target.value;
    setTitle(name);
  };

  const updateStepCount = (step) => {
    if (currentStep !== 5) {
      setCurrentStep(step);
    }
  };

  useEffect(() => {
    dispatch(fetchData())
  },[])
  return (
    <>
    <div className='container'>
      <div className='sub-container'>
        <h2>Filter by</h2>
        <div className='sec-2-contianer'>
          <div className='color-container'>
            <p>Color</p>
            <div className='color-picker'>
            {colors?.map((color,id) => {
              return (
                <div  key={id}>
                  <p
                    className={`color-dot ` }
                    style={{
                      backgroundColor: `${color}`,
                      border: '1px solid #000',
                    }}
                   >
                   </p>
                   </div>
              );
            })}
            </div>
          </div>
          <div className='title-container'>
            <p className='input-title'>title/subtitle :</p>
            <input
              type='text'
              placeholder='title'
              name='title'
              value={title}
              onChange={(e) => handleChange(e)}
              disabled={true}
            />
          </div>
        </div>
        <div className='progress-bar-container'>
          <div className='progress'>
            <div
              className='progress-bar'
              role='progressbar'
              style={{ width: `${progressPercentage}%`, color: 'transparent' }}
              aria-valuenow={currentStep}
              aria-valuemin='0'
              aria-valuemax={totalSteps}>
              {currentStep}/{totalSteps}
            </div>
          </div>
          <div>
          
            {currentStep}/{totalSteps} Creatives
          </div>
        </div>
        <div className='creative-btn'>
          <button 
          onClick={toggleDrawer}
          disabled= {isOpen ? true : false}
          >
            + Add creative
          </button>
        </div>
        <div className='creativeCreation-box '>
      {
        creationContent?.map((content, id)=> {
          return(
            <>
              <div style={
                {
                  background:`${content.color}`
                }
              }
              className='contentBox'
              >
                <h3 >{content.title}</h3>
                <p >{content.subTitle}</p>
              </div>
            </>
          )
        })
      }
    </div>
      </div>
    <div className='drawer-section'>
    {isOpen && (
        <div className="drawer">
          <h2>Creative Creation <span className='close-btn' onClick={handleClose}>X</span></h2>
          <CreativeDrawer  onhandleDoneClick={() => updateStepCount(currentStep + 1) }  handleClose={handleClose}/>
        </div>
      )}
    </div>
    </div>

 
    </>
  );
}
