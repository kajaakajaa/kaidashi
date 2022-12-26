import modalStyles from '../styles/modal.module.css';
import React, { useRef, useContext, useEffect } from 'react';
import { HeaderContext } from './Header';

export default function Modal() {
  const value = useContext(HeaderContext);

  function overLayClose() {
    if(value.Overlay.current.id == 'check_sign_out_overlay' || value.Overlay.current.id == 'delete_acount_overlay') {
      value.modalRef.current.animate({
        transform: ['translateY(0px)', 'translateY(-50px)'],
        visibility: ['visible', 'hidden'],
        opacity: [1, 0]
      },{
        fill: 'forwards',
        duration: 150
      });
      value.modalFlag.current.checked = false;
      value.Overlay.current.style.zIndex = 'auto';
      value.Overlay.current.id = '';
      value.modalBody.current.innerHTML = '';
      value.hamburgerOpenflag.current.checked = false;
      value.yesBtn.current.id = '';
    }
    else if(value.Overlay.current.id == 'hamburger_open_overlay') {
      value.modalFlag.current.checked = false;
      value.Overlay.current.style.zIndex = 'auto';
      value.Overlay.current.id = '';
      value.hamburgerOpenflag.current.checked = false;
    }
  }

  function YesBtn(e, status) {
    if(status == 'yes') {
      let id = e.target.id;
      if(id == 'check_sign_out') {
        overLayClose();
      }
      else if(id == 'delete_acount') {
        overLayClose();
      }
    }
    else if(status == 'no') {
      overLayClose();
    }
  }

  return(
    <>
      <input type="checkbox" id="hamburger_flag" className={modalStyles.modalFlag} ref={value.modalFlag} />
      <div className={modalStyles.overlay} ref={value.Overlay} onClick={overLayClose}>
        <div className={modalStyles.modal} onClick={(e)=> {e.preventDefault(); e.stopPropagation();}} ref={value.modalRef}>
          <div className={modalStyles.modalBody} ref={value.modalBody}></div>
          <div className={modalStyles.modalFooter} ref={value.modalFooter}>
            <div>
              <button onClick={(e)=> {YesBtn(e, 'yes')}} ref={value.yesBtn}>yes</button>
              <button onClick={(e)=> {YesBtn(e, 'no')}}>no</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}