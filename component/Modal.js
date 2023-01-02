import modalStyles from '../styles/modal.module.css';
import React, { useRef, useContext, useEffect } from 'react';
import { IndexContainerContext } from '../pages/';
import { RegistItemResponsive } from '../component/index';

export default function Modal() {
  const indexValue = useContext(IndexContainerContext);

  function overLayClose() {
    if(indexValue.Overlay.current.id == 'check_sign_out_overlay' || indexValue.Overlay.current.id == 'delete_acount_overlay') {
      indexValue.modalRef.current.animate({
        transform: ['translateY(0px)', 'translateY(-50px)'],
        visibility: ['visible', 'hidden'],
        opacity: [1, 0]
      },{
        fill: 'forwards',
        duration: 150
      });
      indexValue.modalFlag.current.checked = false;
      indexValue.Overlay.current.style.zIndex = 'auto';
      indexValue.Overlay.current.id = '';
      indexValue.modalBody.current.innerHTML = '';
      indexValue.hamburgerOpenflag.current.checked = false;
      indexValue.yesBtn.current.id = '';
    }
    else if(indexValue.Overlay.current.id == 'hamburger_open_overlay') {
      indexValue.modalFlag.current.checked = false;
      indexValue.Overlay.current.style.zIndex = 'auto';
      indexValue.Overlay.current.id = '';
      indexValue.hamburgerOpenflag.current.checked = false;
    }
    else if(indexValue.Overlay.current.id == 'check_registBtn_responsive_overlay') {
      indexValue.modalFlag.current.checked = false; //overlay表示
      indexValue.Overlay.current.id = '';
      //レスポンシブの新規商品登録フォームの非表示
      indexValue.RegistItemResponsiveWrapper.current.animate({
        opacity: [1, 0],
        transform: ['translateY(0)', 'translateY(-50px)']
      }, {
        fill: 'forwards',
        duration: 150
      });
      
      setTimeout(()=> {
        indexValue.RegistItemResponsiveWrapper.current.style.display = 'none';
        Object.assign(indexValue.Overlay.current.style, {
          zIndex: 'auto',
          display: 'flex'
        });
      }, 100);
      indexValue.resetAll();
      console.log(indexValue.resetAll);
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
    <>{/* ↓ ref=modalFLag → overlay表示フラグ*/}
      <input type="checkbox" id="hamburger_flag" className={modalStyles.modalFlag} ref={indexValue.modalFlag} />
      <div className={modalStyles.overlay} ref={indexValue.Overlay} onClick={overLayClose}>
        <RegistItemResponsive />
        <div className={modalStyles.modal} onClick={(e)=> {e.preventDefault(); e.stopPropagation();}} ref={indexValue.modalRef}>
          <div className={modalStyles.modalBody} ref={indexValue.modalBody}></div>
          <div className={modalStyles.modalFooter} ref={indexValue.modalFooter}>
            <div>
              <button onClick={(e)=> {YesBtn(e, 'yes')}} ref={indexValue.yesBtn}>yes</button>
              <button onClick={(e)=> {YesBtn(e, 'no')}}>no</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}