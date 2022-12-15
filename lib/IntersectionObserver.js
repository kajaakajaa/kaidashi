export function Observer(value) {
  const option = {
    root: null,
    rootMargin: '-90% 0px 0px 0px'
  }
  const observeTarget = value['observeTarget'].current;
  const toTop = value['toTop'].current;

  function fadeIn() {
    toTop.style.display = 'block';
    toTop.animate({
      visibility: ['hidden', 'visible'],
      opacity: [0, 1]
    },{
      fill: 'forwards',
      duration: 100
    });
  }

  function fadeOut() {
    toTop.animate({
      visibility: ['visible', 'hidden'],
      opacity: [1, 0]
    },{
      fill: 'forwards',
      duration: 100
    })
  }

  const observerProp = new IntersectionObserver((entries, observer)=> {
    entries.forEach((entry, _)=> {
      if(entry.isIntersecting) {
        fadeOut();
      }
      else {
        fadeIn();
      }
    });
  }, option);
  observerProp.observe(observeTarget);
}