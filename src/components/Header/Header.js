import React, { useState, useContext } from 'react';

import css from './Header.module.css';
import mainCss from '../../App.module.css';
import { AddReservoirModal } from '../AddReservoirModal/AddReservoirModal';
import { AppContext } from '../../App';

import logo from '../../assets/logo.svg';

const Header = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [burgerActive, setBurgerActive] = useState(false);

  const {setAllTrigger} = useContext(AppContext);


  return (
    <div className={css.header__wrapper}>
      <div className={mainCss.container}>
        <div className={css.header}>
          <div className={css.logo}>
            <img src={logo} alt="logo"/>
            Chemical simulator
          </div>

          <div style={{left: burgerActive ? '-20px' : 'calc(100vw - 20px)'}} className={css.header__right}>
            <div onClick={() => setAllTrigger('start')} className={mainCss.green__btn}>
              Start all
            </div>
            <div onClick={() => setAllTrigger('stop')} className={mainCss.red__btn}>
              Stop all
            </div>
            <div onClick={() => setIsAddModalOpen(true)} className={mainCss.blue__btn}>
              Add reservoir
            </div>
          </div>
          <div onClick={() => setBurgerActive(!burgerActive)} className={css.burger__btn}>
            <div/>
            <div/>
            <div/>
          </div>
        </div>
        {isAddModalOpen && <AddReservoirModal setModalOpen={setIsAddModalOpen}/>}
      </div>
    </div>

  );
};

export { Header };
