import modalStyles from '../styles/modal.module.css';
import React, { useRef, useContext, useEffect } from 'react';
import { ParentContext } from './Header';

export default function Modal() {
  const value = useContext(ParentContext);
  const modalBody = useRef(null);
  const modalFooter = useRef(null);

  function overLayClose() {
    value.modalRef.current.animate({
      transform: ['translateY(0px)', 'translateY(-50px)'],
      visibility: ['visible', 'hidden'],
      opacity: [1, 0]
    },{
      fill: 'forwards',
      duration: 150
    });
    value.modalFlag.current.checked = false;
  }

  useEffect(()=> {
    return()=> {}
  })

  return(
    <>
      <input type="checkbox" id="hamburger_flag" className={modalStyles.modalFlag} ref={value.modalFlag} />
      <div className={modalStyles.overlay} ref={value.Overlay} onClick={overLayClose}>
        <div className={modalStyles.modal} onClick={(e)=> {e.preventDefault(); e.stopPropagation();}} ref={value.modalRef}>
          <div className={modalStyles.modalBody} ref={modalBody}></div>
          <div className={modalStyles.modalFooter} ref={modalFooter}></div>
        </div>
      </div>
    </>
  )
}