// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Head from 'next/head';
import indexStyles from '../styles/index.module.css';
import { Header } from '../component/index';
import React, { useEffect, useRef, createRef } from 'react';

// export async function getServerSideProps() {
  // let query = {};
  //     query['user_id'] = 1;
  //     query['menu_id'] = 2;
  // let data = {};
  // let data = null;
  // data['dataprops'] = await setListData(query);
  // return{
  //   props: {data}
  // }
// }

export default function Index({data}) {
  const signArea = useRef(null);
  const tbody = useRef(null);
  const updateItemNumberRefs = useRef([]);
  for(let i = 0; i < Items().length; i++) {
    updateItemNumberRefs.current[i] = createRef(); //updateItemNumberRefs の配列の中に個々の ref が入っていて、参照する時は ' updateItemNumberRefs.current[i]' で呼び出す。
  }
  const itemDeleteBtnRefs = useRef([]);
  for(let i = 0; i < Items().length; i++) {
    itemDeleteBtnRefs.current[i] = createRef();
  }

  //ログアウト・退会エリアの表示
  function signAreaShow() {
    const signAreaWrapper = signArea.current;
    Object.assign(signAreaWrapper.style, {
      display: 'block'
    });
  }
  
   //※疑似データ
  function Items() {
    let items = [];
        items = [
          {'品名': '納豆', '価格': 100, '個数': 5, 'status': 1},
          {'品名': '牛乳', '価格': 150, '個数': 1, 'status': 0},
          {'品名': 'ブロッコリースプラウト', '価格': 110, '個数': 1, 'status': 1}
        ];
        return items;
  }
  
  //serverSidePropsに記述する（tbodyにレンダリングするデータ）※関数ではなく、変数であることに注意。
  const itemList = Items().map((item,index)=>{
    if(Items().length >= 1) {
      let statusFlag = item['statusFlag'] == 1 ? '済' : '未';
      return(
        <tr key={index}>
          <td>{item['品名']}</td>
          <td>{item['価格']} 円</td>
          <td>
            <label htmlFor="update_item_number">
              <input type="number" min="0" name="update_item_number" id={'update_item_number'+ index} key={index} ref={updateItemNumberRefs.current[index]} /> 個
            </label>
          </td>
          <td>
            <input type="checkbox" name="status_flag" id="status_flag" />
            <label htmlFor="status_flag">{statusFlag}</label>
          </td>
          <td key={index} ref={itemDeleteBtnRefs.current[index]} id={'item_delete' + index}>削除</td>
        </tr>
      )
    }
  });

  function setListItem() {
    Items().forEach((item, index)=> {
      updateItemNumberRefs.current[index].current.value = item['個数'];
    });
  }

  useEffect(()=> {
    signAreaShow();
    setListItem();
    Items().map((e, i)=> {
      itemDeleteBtnRefs.current[i].current.addEventListener('click', (e)=> {
        console.log(e.target.id);
      });
    });
    return()=> {}
  });

  return(
    <>
      <Head>
        <title>Kaidashi</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header signArea={signArea}/>
      <main>
        <div className={indexStyles.container} id="top">
          <form className={indexStyles.registItem} onSubmit={(e)=> {e.preventDefault}}>
            <div>
              <label htmlFor="item_name">品名</label>
              <input type="text" name="item_name" id="item_name" />
            </div>
            <div>
              <label htmlFor="price">価格</label>
              <input type="number" min="0" name="price" id="price" />
            </div>
            <div>
              <label htmlFor="regist_item_number">個数</label>
              <input type="number" min="0" name="regist_item_number" id="regist_item_number" />
            </div>
            <div><input type="submit" value="新規商品登録" /></div>
          </form>
          <form onSubmit={(e)=> {e.preventDefault}} id="item_update">
            <table>
              <tbody ref={tbody}>
                {itemList}
              </tbody>
            </table>
          </form>
          <input type="submit" form="item_update" value="更新" />
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}
