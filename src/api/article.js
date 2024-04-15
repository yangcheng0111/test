import request from '@/utils/request'

// 获取文章分类接口
export const articleChannelGetInfoService = () => {
  return request.get('/my/cate/list')
}

// 添加文章分类接口
export const articleChannelAddInfoService = (data) => {
  return request.post('/my/cate/add', data)
}

// 编辑文章分类接口
export const articleChannelEditInfoService = (data) => {
  return request.put('/my/cate/info', data)
}

//删除文章分类接口
export const articleChannelDeleteInfoService = (id) => {
  return request.delete('/my/cate/del', {
    params: {
      id: id
    }
  })
}

//获取文章管理数据接口
export const articleManageGetListService = (data) => {
  return request.get('/my/article/list', {
    params: data
  })
}

//获取文章详情数据接口
export const articleManageGetInfoService = (id) => {
  return request.get('/my/article/info', {
    params: {
      id: id
    }
  })
}

//添加文章接口
export const articleManageAddInfoService = (data) => {
  return request.post('/my/article/add', data)
}

//删除文章接口
export const articleManageDeleteInfoService = (id) => {
  return request.delete('/my/article/info', {
    params: {
      id: id
    }
  })
}
