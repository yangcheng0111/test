import { dayjs } from 'element-plus'

//剪头函数 移除大括号的话 return是隐式的
export const fommatTime = (time) => dayjs(time).format('YYYY年MM月DD日')
