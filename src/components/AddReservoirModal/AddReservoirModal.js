import React, { useContext } from 'react';

import css from '../../App.module.css';

import close from '../../assets/close.svg';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';
import { ReservoirValidator } from '../../validation/reservoir.validator';
import { AppContext } from '../../App';
import { ReservoirsServices } from '../../services/reservoirs.services';


const AddReservoirModal = ({setModalOpen}) => {
  const {
    register, handleSubmit, formState: {errors}
  } = useForm({resolver: joiResolver(ReservoirValidator)});

  const {setLoadTrigger} = useContext(AppContext);


  const createReservoir = (data) => {
    ReservoirsServices.create(
      {
        ...data, 'inputPipeConnected': false,
        'outputPipeConnected': false,
        'working': false
      }
    ).then(() => {
      setLoadTrigger(t => t + 1);
      setModalOpen(false);
    });
  };

  const textInputs = [
    {
      name: 'name',
      placeholder: 'Name'
    }, {
      name: 'currentLevel',
      placeholder: 'Current level'
    }, {
      name: 'lowLevelSensor',
      placeholder: 'Minimum Level'
    }, {
      name: 'highLevelSensor',
      placeholder: 'Maximum Level'
    },
  ];

  return (
    <div onClick={() => setModalOpen(false)} className={css.modal__wrapper}>
      <div onClick={event => event.stopPropagation()} className={css.add__modal}>
        <div className={css.add__modal_header}>
          <div>
            Add reservoir
          </div>
          <button onClick={() => setModalOpen(false)} className={css.close__modal_btn}>
            <img style={{height: '15px'}} src={close} alt="close"/>
          </button>
        </div>
        <form className={css.create__reservoir_form} onSubmit={handleSubmit(createReservoir)}>
          {textInputs.map(({name, placeholder}) =>
            <input key={name} type="text" autoComplete="none"
                   className={errors[name] ? css.create__reservoir_input_error : css.create__reservoir_input}
                   placeholder={placeholder} {...register(name)}/>)}
          <div className={css.checks__wrapper}>
            <div className={css.check__wrapper}>
              <div>Has heater</div>
              <input type="checkbox" {...register('hasHeater')}/>
            </div>
            <div className={css.check__wrapper}>
              <div>Has mixer</div>
              <input type="checkbox" {...register('hasMixer')}/>
            </div>
          </div>
          <button className={css.create__reservoir_btn}>CREATE</button>
        </form>
      </div>
    </div>
  );
};

export { AddReservoirModal };
