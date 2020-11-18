export function debounce(func,delay){ //防抖函数
  let timer = null; //timer是核心..
  return function(...args){
    if(timer) clearTimeout(timer);  //判断有没有timer,第零次和最后一次时没有timer(个人理解)
    timer  = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}