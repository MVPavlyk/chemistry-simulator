import React, { useEffect, useState, useContext } from 'react';
import { ReservoirsServices } from '../../services/reservoirs.services';

import css from './ResevoirsList.module.css';
import mainCss from '../../App.module.css';
import { ReservoirRow } from '../ReservoirRow/ReservoirRow';
import { AppContext } from '../../App';

const ReservoirsList = () => {
  const [allReservoirs, setAllReservoirs] = useState(null);
  const {loadTrigger} = useContext(AppContext);

  useEffect(() => {
    ReservoirsServices.getAll().then(value => setAllReservoirs(value?.reservoirList));
  }, [loadTrigger]);


  return (
    <div className={mainCss.container}>
      <div className={css.reservoirs__list}>
        <div className={css.reservoirs__header}>
          <div className={css.name}>Name</div>
          <div className={css.level}>Current level</div>
          <div className={css.min}>Min level</div>
          <div className={css.max}>Max level</div>
          <div className={css.work}>Is working</div>
          <div className={css.pump}>Pump mode</div>
          <div className={css.start}>Start/Stop</div>
        </div>
        {allReservoirs?.map(el => <ReservoirRow key={el?.id} reservoir={el}/>)}
      </div>
      {/*{JSON.stringify(allReservoirs)}*/}
    </div>
  );
};

export { ReservoirsList };
