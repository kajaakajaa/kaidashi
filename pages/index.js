import Head from 'next/head';
import indexStyles from '../styles/index.module.css';
import { Header, Footer, RegistItemResponsive } from '../component/index';
import React, { useEffect, useRef, createRef, createContext, useState } from 'react';
export const IndexContainerContext = createContext();
import { Observer } from '../lib/IntersectionObserver';
import { Link as Scroll } from 'react-scroll';

export async function getServerSideProps() {
  let query = {};
      query['user_id'] = 1;
  const response = await fetch('https://kajaaserver.com/kaidashi_php/sql_data.php?mode=set_list_data', {
    method: 'POST',
    body: JSON.stringify(query)
  });

  let default_data = {};
  default_data['item_data_from_php'] = await response.json();
  default_data['user_id'] = 1; // 仮
  return{
    props: {default_data}
  }
}

export default function Index({default_data}) {
  const signArea = useRef(null);
  const updateItemNumberRefs = useRef([]);
  const itemDeleteBtnRefs = useRef([]);
  const hamburgerBtn = useRef(null);
  const observeTarget = useRef(null);
  const toTop = useRef(null);
  const registItemBtn = useRef(null);
  const purchaseStatusFlagRefs = useRef([]);
  const purchaseStatusBtnRefs = useRef([]);
  const Item = useRef(null);
  const Price = useRef(null);
  const itemNumber = useRef(null);
  const Main = useRef(null);
  const errorItem = useRef(null);
  const errorPrice = useRef(null);
  const errorNumber = useRef(null);
  const [registItemForm, setRegistItemForm] = useState(false);
  const errorDuplicate = useRef(null);
  //modal系
  const modalFlag = useRef(null);
  const Overlay = useRef(null);
  const modalRef = useRef(null);
  const modalBody = useRef(null);
  const modalFooter = useRef(null);
  const yesBtn = useRef(null);
  const hamburgerOpenflag = useRef(null);
  const RegistItemResponsiveWrapper = useRef(null);
  const ItemResponsive = useRef(null);
  const PriceResponsive = useRef(null);
  const itemNumberResponsive = useRef(null);
  const RegistItemBtnResponsive = useRef(null);
  const errorItemResponsive = useRef(null);
  const errorPriceResponsive = useRef(null);
  const errorNumberResponsive = useRef(null);
  const errorDuplicateResponsive = useRef(null);

  //topボタンの表示・非表示処理の為のdom
  const observerDoms = {
    observeTarget: observeTarget,
    toTop: toTop
  }
  
  //レコードの数だけuseRefのref属性をつける(以下for文)
  for(let i = 0; i < default_data['item_data_from_php'].length; i++) {
    updateItemNumberRefs.current[i] = createRef(); //updateItemNumberRefs の配列の中に個々の ref が入っていて、参照する時は ' updateItemNumberRefs.current[i]' で呼び出す。
  }

  for(let i = 0; i < default_data['item_data_from_php'].length; i++) {
    itemDeleteBtnRefs.current[i] = createRef();
  }

  for(let i = 0; i < default_data['item_data_from_php'].length; i++) {
    purchaseStatusFlagRefs.current[i] = createRef();
  }

  for(let i = 0; i < default_data['item_data_from_php'].length; i++) {
    purchaseStatusBtnRefs.current[i] = createRef();
  }

  const value = {
    deleteConfirm: deleteConfirm,
    signArea: signArea,
    hamburgerClose: hamburgerClose,
    hamburgerBtn: hamburgerBtn,
    modalFlag: modalFlag,
    Overlay: Overlay,
    modalRef: modalRef,
    modalBody: modalBody,
    modalFooter: modalFooter,
    yesBtn: yesBtn,
    hamburgerOpenflag: hamburgerOpenflag,
    RegistItemResponsiveWrapper: RegistItemResponsiveWrapper,
    ItemResponsive: ItemResponsive,
    PriceResponsive: PriceResponsive,
    itemNumberResponsive: itemNumberResponsive,
    RegistItemBtnResponsive: RegistItemBtnResponsive,
    errorItemResponsive: errorItemResponsive,
    errorPriceResponsive: errorPriceResponsive,
    errorNumberResponsive: errorNumberResponsive,
    errorDuplicateResponsive: errorDuplicateResponsive,
    resetAll: resetAll
  }

  //ログアウト・退会エリアの表示
  function signAreaShow() {
    const signAreaStyle = signArea.current;
    Object.assign(signAreaStyle.style, {
      display: 'flex'
    });
    
    Object.assign(hamburgerBtn.current.style, {
      display: 'flex'
    });
  }

  function resetErrorText() {
    //pc
    errorItem.current.style.display = 'none';
    errorPrice.current.style.display = 'none';
    errorNumber.current.style.display = 'none';
    errorDuplicate.current.style.display = 'none';
    //ipad
    errorItemResponsive.current.style.display = 'none';
    errorPriceResponsive.current.style.display = 'none';
    errorNumberResponsive.current.style.display = 'none';
    errorDuplicateResponsive.current.style.display = 'none';
  }

  function resetAll() {
    //pc
    Item.current.value = '';
    Price.current.value = '';
    itemNumber.current.value = '';
    //ipad
    ItemResponsive.current.value = '';
    PriceResponsive.current.value = '';
    itemNumberResponsive.current.value = '';
    resetErrorText();
  }

  //新商品登録のフォームエラーcheck
  function errorCheck(errorValue) {
    let errorCount = 0;
    resetErrorText();

    if(errorValue.Item.current.value == '') {
      errorValue.errorItem.current.style.display = 'block';
      errorCount++;
    }
    if(errorValue.Price.current.value == '') {
      errorValue.errorPrice.current.style.display = 'block';
      errorCount++;
    }
    if(errorValue.itemNumber.current.value == '') {
      errorValue.errorNumber.current.style.display = 'block';
      errorCount++;
    }
    return errorCount;
  }

  //新規商品登録ボタンの役割レスポンシブの境を監視・役割切り替え（※実装し直した）
  function responsiveRegistBtnView() {
    const isSmall = window.innerWidth <= 768;
    if(isSmall) {
      registItemBtn.current.type = 'button'; //ipad以下
      registItemBtn.current.addEventListener('click', ()=> { //※送信ではなく、modalの表示
        modalFlag.current.checked = true; //overlay表示
        Overlay.current.id = 'check_registBtn_responsive_overlay';
        Object.assign(Overlay.current.style, {
          zIndex: 1,
          display: 'block'
        });
        //レスポンシブの新規商品登録フォームの表示
        RegistItemResponsiveWrapper.current.style.display = 'block';
        RegistItemResponsiveWrapper.current.animate({
          opacity: [0, 1],
          transform: ['translateY(-20px)', 'translateY(0)']
        }, {
          fill: 'forwards',
          duration: 150
        });
        //登録ボタン
        RegistItemBtnResponsive.current.addEventListener('click', ()=> {
          const errorValue = {
            Item: ItemResponsive,
            Price: PriceResponsive,
            itemNumber: itemNumberResponsive,
            errorItem: errorItemResponsive,
            errorPrice: errorPriceResponsive,
            errorNumber: errorNumberResponsive
          }
          if(errorCheck(errorValue) == 0) {
            let query = {};
                query['user_id'] = default_data['user_id'];
                query['item_name'] = ItemResponsive.current.value;
                query['price'] = PriceResponsive.current.value;
                query['number'] = itemNumberResponsive.current.value;
            (async()=> {
              const response = await fetch('/api/request?mode=regist_item', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(query)
              });
              const result = await response.json();
              resetAll();
              if(result['regist_data_from_php'] == 1) {
                window.location.reload();
              }
              else if(result['regist_data_from_php'] == 0) {
                errorDuplicateResponsive.current.style.display = 'block';
              }
            })();
          }
        });
      });
    }
    else {
      registItemBtn.current.type = 'submit'; //pc以上
      registItemBtn.current.addEventListener('click', ()=> {
        const errorValue = {
          Item: Item,
          Price: Price,
          itemNumber: itemNumber,
          errorItem: errorItem,
          errorPrice: errorPrice,
          errorNumber: errorNumber
        }
        if(errorCheck(errorValue) == 0) {
          let query = {};
              query['user_id'] = default_data['user_id'];
              query['item_name'] = Item.current.value;
              query['price'] = Price.current.value;
              query['number'] = itemNumber.current.value;
          (async()=> {
            const response = await fetch('/api/request?mode=regist_item', {
              method: 'POST',
              headers: {'Content-type': 'application/json'},
              body: JSON.stringify(query)
            });
            const result = await response.json();
            resetAll();
            if(result['regist_data_from_php'] == 1) {
              window.location.reload();
            }
            else {
              errorDuplicate.current.style.display = 'block';
            }
          })();
        }
      });
    }
  }

  function reversePurchaseFlag() {
    default_data['item_data_from_php'].forEach((e, i)=> {
      let Btn = purchaseStatusBtnRefs.current[i].current;
      Btn.addEventListener('click', (e)=> {
        if(e.target.innerHTML == '未') {
          e.target.style.backgroundColor = 'rgb(0, 24, 124)';
          e.target.innerHTML = '済';
        }
        else {
          e.target.style.backgroundColor = 'rgb(159, 0, 0)';
          e.target.innerHTML = '未';
        }
      })
    });
  }

  //増減ボタン
  function spinnerUpDown(e, status) {
    if(status == 'Decrease') {
      const target = e.target;
      const number = target.nextElementSibling;
      number.stepDown();
    }
    else if(status == 'Increase') { //ボタン
      const target = e.target;
      const number = target.previousElementSibling;
      number.stepUp();
    }
  }

  function hamburgerClose(e) {
    const signAreaWrapper = e.target.children[0];
    signAreaWrapper.animate({
      right: [0, '-40vw']
    },{
      fill: 'forwards',
      duration: 150
    });

    e.target.animate({
      background: ['rgb(0 0 0 / 20%)', 'rgb(0, 0, 0, 0)'],
      visibility: ['visible', 'hidden']
    },{
      fill: 'forwards',
      duration: 200
    });
  }

  function deleteConfirm(menu_id, user_id) {
    modalFlag.current.checked = true; //overlay表示
    Overlay.current.id = 'check_deleteBtn_overlay';
    Overlay.current.style.zIndex = 1;
    yesBtn.current.id = 'check_deleteBtn_yes';
    modalBody.current.innerHTML = '商品を削除しても宜しいですか？';
    modalRef.current.animate({
      transform: ['translateY(-50px)', 'translateY(0px)'],
      visibility: ['hidden', 'visible'],
      opacity: [0, 1]
    },{
      fill: 'forwards',
      duration: 150
    });
  }

  function itemList() {
    return default_data['item_data_from_php'].map((item, index)=> {
      if(default_data['item_data_from_php'].length >= 1) {
        let statusFlag = item['purchase_status'] == 0 ? false : true;
        let purchase_status = statusFlag == false ? <span ref={purchaseStatusBtnRefs.current[index]} style={{backgroundColor: '#00187C'}}>済</span> : <span ref={purchaseStatusBtnRefs.current[index]} style={{backgroundColor: '#9F0000'}}>未</span>;
        return(
          <li key={index} className={indexStyles.itemIndex}>
            <div><span>{item['item_name']}</span></div>
            <div>{item['price']} 円</div>
            <div className={indexStyles.Spinner}>
              <div className={indexStyles.spinnerWrapper}>
                <span className={indexStyles.spinnerDown} onClick={(e)=> {spinnerUpDown(e, 'Decrease')}}></span>
                <input type="number" min="0" name="update_item_number" step="1" id={'update_item_number'+ index} ref={updateItemNumberRefs.current[index]} />
                <span className={indexStyles.spinnerUp} onClick={(e)=> {spinnerUpDown(e, 'Increase')}}></span>
                <span>&nbsp;個</span>
              </div>
            </div>
            <div>
              <input type="checkbox" name="status_flag" id={"status_flag" + index} ref={purchaseStatusFlagRefs.current[index]} defaultChecked={statusFlag} />
              <label htmlFor={"status_flag" + index}>{purchase_status}</label>
            </div>
            <div ref={itemDeleteBtnRefs.current[index]}><span onClick={()=> {deleteConfirm()}}>削除</span></div>
          </li>
        )
      }
    });
  }

  useEffect(()=> {
    if(default_data['user_id'] == 1) {
      //個数をデータベースより反映表示
      default_data['item_data_from_php'].forEach((item, index)=> {
        updateItemNumberRefs.current[index].current.value = item['number'];
      });

      //ログアウト・退会の表示
      signAreaShow();
      Observer(observerDoms);
      reversePurchaseFlag()
      responsiveRegistBtnView();
    }
    
    return()=> {
      resetAll();
    }
  }, [registItemForm]);

  if(default_data['user_id'] == 1) {
    return(
      <>
        <Head>
          <title>Kaidashi</title>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={indexStyles.container} id="top">
          <IndexContainerContext.Provider value={value}>
            <Header />
            <main className={indexStyles.main} ref={Main}>
              <div className={indexStyles.observeTarget} ref={observeTarget}></div> 
              <div className={indexStyles.mainWrapper}>
                <form className={indexStyles.registItem} onSubmit={(e)=> {e.preventDefault();}}>
                  <div>
                    <div>
                      <label htmlFor="item_name">品名</label>
                      <input type="text" name="item_name" id="item_name" ref={Item} />
                      <p className={`${indexStyles.errorMessage} ${indexStyles.errorItem}`} ref={errorItem}>※ 品名を入力して下さい。</p>
                    </div>
                    <div>
                      <label htmlFor="price">価格</label>
                      <input type="number" min="0" name="price" id="price" ref={Price} />
                      <p className={`${indexStyles.errorMessage} ${indexStyles.errorPrice}`} ref={errorPrice}>※ 価格を入力して下さい。</p>
                    </div>
                    <div>
                      <label htmlFor="regist_item_number">個数</label>
                      <input type="number" min="0" name="regist_item_number" id="regist_item_number" ref={itemNumber} />
                      <p className={`${indexStyles.errorMessage} ${indexStyles.errorNumber}`} ref={errorNumber}>※ 個数を入力して下さい。</p>
                    </div>
                  </div>
                  <p ref={errorDuplicate}>※ 既に登録されている商品になります。</p>
                  <div><input type="button" value="新規商品登録" className={indexStyles.registItemBtn} ref={registItemBtn} /></div>
                </form>
                <form method="post" action="/" onSubmit={(e)=> {e.preventDefault();}} id="item_update" className={indexStyles.itemIndexWrapper}>
                  <ul>
                    {itemList()} {/*動的なレイアウトは上記で定義*/}
                  </ul>
                </form>
                <input type="submit" form="item_update" value="更新" className={indexStyles.updateBtn} />
                <div className={indexStyles.toTopWrapper} ref={toTop} alt="topへ戻る" title="topへ戻る">
                  <Scroll to="top" smooth={true} duration={600}></Scroll>
                </div>
              </div>
            </main>
            <Footer />
          </IndexContainerContext.Provider>
        </div>
      </>
    )
  }
  else {
    return(
      <>
      <Head>
        <title>Not SignIn</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>出直してこい！！</h1>
      </>
    )
  }
}
