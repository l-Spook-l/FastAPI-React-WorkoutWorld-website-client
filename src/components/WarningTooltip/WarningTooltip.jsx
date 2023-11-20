import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/fa';
import style from './WarningTooltip.module.css'

const WarningTooltip = () => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="tooltip-top">
        When changing the number of approaches, your past approach results will be deleted!
      </Tooltip>}
    >
      <div className={style.warningTooltip}>
        <FaExclamationCircle className={style.exclamationIco}/>
      </div>
    </OverlayTrigger>
  );
};

export default WarningTooltip;
