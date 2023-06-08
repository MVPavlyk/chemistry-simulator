import React, { useEffect, useState, useContext } from 'react';

import listCss from '../ReservoirsList/ResevoirsList.module.css';
import mainCss from '../../App.module.css';

import { LevelIndicator } from '../LevelIndicator/LevelIndicator';
import { ReservoirsServices } from '../../services/reservoirs.services';
import { AppContext } from '../../App';
import { ReservoirInfoModal } from '../ReservoirInfoModal/ReservoirInfoModal';

const ReservoirRow = ({reservoir: initialReservoir}) => {
  const [reservoir, setReservoir] = useState(null);

  const {allTrigger} = useContext(AppContext);

  const [modalOpen, setModalOpen] = useState(false);

  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    setReservoir(initialReservoir);
  }, [initialReservoir]);

  useEffect(() => {
    if (reservoir?.working) {
      const interId = setInterval(() => {
        ReservoirsServices.info(reservoir?.id).then(value => setReservoir(value.reservoir));
      }, 3000);
      setIntervalId(interId);

      return () => clearInterval(interId);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

  }, [reservoir, reservoir?.working]);

  useEffect(() => {
    if (allTrigger === 'start') {
      if (!reservoir?.working) startReservoir();
    } else if (allTrigger === 'stop') {
      if (reservoir?.working) stopReservoir();
    }
  }, [allTrigger]);

  const startReservoir = () => {
    setReservoir(val => {
      return {
        ...val, working: true
      };
    });
  };

  const stopReservoir = () => {
    ReservoirsServices.update({...reservoir, working: false}).then(value => setReservoir(value.reservoir));
  };

  return (
    <>
      {modalOpen && <ReservoirInfoModal startReservoir={startReservoir} stopReservoir={stopReservoir} reservoir={reservoir} setModalOpen={setModalOpen}/>}
      <div onClick={() => setModalOpen(true)} className={listCss.reservoir__row}>
        <div className={listCss.name}>{reservoir?.name}</div>
        <div className={listCss.level}>
          <LevelIndicator
            currentLevel={reservoir?.currentLevel}
            min={reservoir?.lowLevelSensor}
            max={reservoir?.highLevelSensor}
          />
        </div>
        <div className={listCss.min}>{reservoir?.lowLevelSensor}</div>
        <div className={listCss.max}>{reservoir?.highLevelSensor}</div>
        <div className={listCss.work}>{reservoir?.working ? 'Yes' : 'No'}</div>
        <div className={listCss.pump}>
          {reservoir?.inputPipeConnected ? 'Input' : reservoir?.outputPipeConnected ? 'Output' : 'None'}
        </div>
        <div className={listCss.start}>
          {reservoir?.working
            ?
            <button
              onClick={() => stopReservoir()}
              style={{width: '60px'}}
              className={mainCss.red__btn}
            >
              Stop
            </button>
            :
            <button
              onClick={() => startReservoir()}
              style={{width: '60px'}}
              className={mainCss.green__btn}
            >
              Start
            </button>
          }
        </div>
      </div>
    </>
  );
};

export { ReservoirRow };
