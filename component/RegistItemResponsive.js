import React, { useContext } from 'react';
import { IndexContainerContext } from '../pages';
import modalStyles from '../styles/modal.module.css';

export default function RegistItemResponsive() {
  const IndexContainerValue = useContext(IndexContainerContext);

  return(
    <form className={modalStyles.RegistItemResponsiveWrapper} ref={IndexContainerValue.RegistItemResponsiveWrapper} onSubmit={(e)=> {e.preventDefault();}}>
      <div>
        <label htmlFor="item_name">品名</label>
        <input type="text" name="item_name" id="item_name" ref={IndexContainerValue.ItemResponsive} />
      </div>
      <div>
        <label htmlFor="price">価格</label>
        <input type="number" name="price" id="price" ref={IndexContainerValue.PriceResponsive} />
      </div>
      <div>
        <label htmlFor="regist_item_number">個数</label>
        <input type="number" name="regist_item_number" id="regist_item_number" ref={IndexContainerValue.RegistNumberResponsive} />
      </div>
      <div>
        <input type="submit" value="登録" ref={IndexContainerValue.RegistItemBtnResponsive} />
      </div>
    </form>
  )
}