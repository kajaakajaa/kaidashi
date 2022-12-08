import navStyles from '../styles/nav.module.css';
import React, { useEffect, useContext } from 'react';
import { HeaderContext } from '../pages/index';
import { ParentContext } from './Header';

export default function Nav(props) {
  const mainValue = useContext(HeaderContext);
  const parentValue = useContext(ParentContext);

  useEffect(()=> {
  })

  return(
    <div className={navStyles.signArea} ref={mainValue.signArea} style={{display: props.display}}>
      <div className={navStyles.signAreaWrapper}>
        <p onClick={parentValue.checkSignOut} className={navStyles.signOutBtn}>ログアウト</p>
        <p onClick={parentValue.checkAcountDelete} className={navStyles.acountDeleteBtn}>退会</p>
      </div>
    </div>
  )
}