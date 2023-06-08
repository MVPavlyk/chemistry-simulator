import React from 'react';

import css from './LevelIndicator.module.css';


const LevelIndicator = ({currentLevel, max, min, customStyles}) => {
  const isCritical = currentLevel <= min + 6 || currentLevel >= max - 6;

  return (
    <div style={customStyles} className={css.level__wrapper}>
      <div className={isCritical ? css.level__inner_critical : css.level__inner}
           style={{width: `${currentLevel}%`}}></div>
      <div className={css.level__number}>{currentLevel}%</div>
    </div>
  );
};

export { LevelIndicator };
