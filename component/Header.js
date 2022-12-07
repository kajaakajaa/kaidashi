import { Link as Scroll } from 'react-scroll';
import Link from 'next/link';
import Image from 'next/image';
import headerStyles from '../styles/header.module.css';
import React, { useEffect, useRef, createContext } from 'react';
export const ParentContext = createContext();
import { Modal } from './index';

export default function Header(props) {
  const modalFlag = useRef(null);
  const Overlay = useRef(null);
  const modalRef = useRef(null);

  const value = {
    modalFlag: modalFlag,
    Overlay: Overlay,
    modalRef: modalRef
  }

  function checkSignOut() {
    modalFlag.current.checked = true;
    Overlay.current.style.zIndex = 2;
    modalRef.current.animate({
      transform: ['translateY(-50px)', 'translateY(0px)'],
      visibility: ['hidden', 'visible'],
      opacity: [0, 1]
    },{
      fill: 'forwards',
      duration: 150
    });
  }

  function checkAcountDelete() {}

  useEffect(()=> {
  })

  return(
    <>
      <ParentContext.Provider value={value}>
        <Modal />
      </ParentContext.Provider>
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