import modalStyles from '../styles/modal.module.css';
import React, { useRef, useContext, useEffect, useState } from 'react';
import { IndexContainerContext } from '../pages/';
import { RegistItemResponsive } from '../component/index';

export default function Modal() {
  const indexValue = useContext(IndexContainerContext);

  return(
    <>{/* ↓ ref=modalFLag → overlay表示フラグ*/}
      <input type="checkbox" id="hamburger_flag" className={modalStyles.modalFlag} ref={indexValue.modalFlag} />
      <div className={modalStyles.overlay} ref={indexValue.Overlay} onClick={indexValue.overLayClose}>
        <RegistItemResponsive />
        <div className={modalStyles.modal} onClick={(e)=> {e.preventDefault(); e.stopPropagation();}} ref={indexValue.modalRef}>
          <div className={modalStyles.modalBody} ref={indexValue.modalBody}></div>
          <div className={modalStyles.modalFooter} ref={indexValue.modalFooter}>
            <div>
              <button onClick={(e)=> {indexValue.modalBtn(e, 'yes')}} ref={indexValue.yesBtn}>yes</button>
              <button onClick={(e)=> {indexValue.modalBtn(e, 'no')}}>no</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}