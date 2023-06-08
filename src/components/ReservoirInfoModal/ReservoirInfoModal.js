import React, { useContext } from 'react';

import mainCss from '../../App.module.css';
import css from '../../App.module.css';
import close from '../../assets/close.svg';
import { LevelIndicator } from '../LevelIndicator/LevelIndicator';
import { ReservoirsServices } from '../../services/reservoirs.services';
import { AppContext } from '../../App';

const ReservoirInfoModal = ({reservoir, setModalOpen, stopReservoir, startReservoir}) => {
  const {setLoadTrigger} = useContext(AppContext);

  const deleteReservoir = () => {
    ReservoirsServices.delete(reservoir?.id).then(() => {
      setLoadTrigger(t => t + 1);
      setModalOpen(false);
    });
  };

  return (
    <div onClick={() => setModalOpen(false)} className={mainCss.modal__wrapper}>
      <div onClick={e => e.stopPropagation()} className={mainCss.add__modal}>
        <div className={mainCss.add__modal_header}>
          <div>
            {reservoir?.name} info
          </div>
          <button onClick={() => setModalOpen(false)} className={css.close__modal_btn}>
            <img style={{height: '15px'}} src={close} alt="close"/>
          </button>
        </div>
        <div className={css.modal__info_wrapper}>
          <div>Current level</div>
          <LevelIndicator
            customStyles={{width: '100%'}}
            currentLevel={reservoir?.currentLevel}
            min={reservoir?.lowLevelSensor}
            max={reservoir?.highLevelSensor}
          />
          <div className={css.info__flex_row}>
            <div>
              Max level:
              <div>{reservoir?.highLevelSensor}</div>
            </div>
            <div>
              Min level:
              <div>{reservoir?.lowLevelSensor}</div>
            </div>
          </div>
          <div className={css.info__flex_row}>
            <div>
              Has heater:
              <div>{reservoir?.hasHeater ? 'Yes' : 'No'}</div>
            </div>
            <div>
              Has mixer:
              <div>{reservoir?.hasMixer ? 'Yes' : 'No'}</div>
            </div>
          </div>
          <div className={css.info__flex_row}>
            <div>
              Working
              <div>{reservoir?.working ? 'Yes' : 'No'}</div>
            </div>
            <div>
              Mode
              <div>{reservoir?.inputPipeConnected ? 'Input' : reservoir?.outputPipeConnected ? 'Output' : 'None'}</div>
            </div>

          </div>
          <div className={css.info__flex_row}>
            {reservoir?.working ?
              <div onClick={stopReservoir} className={css.red__btn}>Stop</div>
              :
              <div onClick={startReservoir} className={css.green__btn}>Start</div>
            }
            <div onClick={deleteReservoir} className={css.red__btn}>DELETE</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ReservoirInfoModal };
