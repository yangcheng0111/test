import request from '@/utils/request'

//注册接口
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}

//登录接口
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}

//获取用户基本资料数据接口
export const userGetInfoService = () => {
  return request.get('/my/userinfo')
}

//更新用户资料接口
export const userSetInfoService = (data) => {
  return request.put('/my/userinfo', data)
}

//更新用户头像接口
export const userSetImgService = (avatar) => {
  return request.patch('/my/update/avatar', {
    avatar: avatar
  })
}

//更新用户密码
export const userSetPwdService = (data) => {
  return request.patch('/my/updatepwd', data)
}
