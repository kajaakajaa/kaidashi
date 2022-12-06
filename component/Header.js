import { Link as Scroll } from 'react-scroll';
import Link from 'next/link';
import Image from 'next/image';
import headerStyles from '../styles/header.module.css';
import React, { useRef } from 'react';

export default function Header(props) {
  const modalFlag = useRef(null);
  const modalBody = useRef(null);
  const modalFooter = useRef(null);
  const Modal = useRef(null);
  const Overlay = useRef(null);

  function overLayClose() {
    Modal.current.animate({
      transform: ['translateY(0px)', 'translateY(-50px)'],
      visibility: ['visible', 'hidden'],
      opacity: [1, 0]
    },{
      fill: 'forwards',
      duration: 150
    });
    modalFlag.current.checked = false;
  }

  function checkSignOut() {
    modalFlag.current.checked = true;
    Overlay.current.style.zIndex = 2;
    Modal.current.animate({
      transform: ['translateY(-50px)', 'translateY(0px)'],
      visibility: ['hidden', 'visible'],
      opacity: [0, 1]
    },{
      fill: 'forwards',
      duration: 150
    });
  }

  function checkAcountDelete() {}

  return(
    <>
      <input type="checkbox" id="hamburger_flag" className={headerStyles.modalFlag} ref={modalFlag} />
      <div className={headerStyles.overlay} ref={Overlay} onClick={overLayClose}>
        <div className={headerStyles.modal} onClick={(e)=> {e.preventDefault(); e.stopPropagation();}} ref={Modal}>
          <div className={headerStyles.modalBody} ref={modalBody}></div>
          <div className={headerStyles.modalFooter} ref={modalFooter}></div>
        </div>
      </div>
      <header>
        <div className={headerStyles.headerLogoWrapper}>
          <Scroll to="to" smooth={true} duration={600}>
            <Image src="/headerLogo.png" width={40} height={30} alt="topへ戻る" title="topへ戻る" priority/>
          </Scroll>
        </div>
        <div className={headerStyles.signAreaWrapper} ref={props.signArea}>
          <p onClick={checkSignOut} className={headerStyles.signOutBtn}>ログアウト</p>
          <p onClick={checkAcountDelete} className={headerStyles.acountDeleteBtn}>退会</p>
        </div>
      </header>
    </>
  )
}