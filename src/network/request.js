import axios from 'axios'

export function request(config){  //使用export default 导出的模块，在其他地方引用导入的时候才不用加{}
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/w6/',
    timeout:5000
  })

  instance.interceptors.request.use(config => {
    return config
  },err=>{
    alert('404')
  })

  return instance(config)
}