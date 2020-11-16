import {request} from './request'

export function getHomeMultidata(){ 
  return request({
    url:'/home/multidata'
  })
}

// 首页商品
export function getHomeGoods(type,page){ //数据type有三种分类，pop,news,sell,所以要有type参数，page是数据分页页数
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}