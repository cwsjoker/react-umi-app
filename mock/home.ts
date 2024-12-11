import mockjs from 'mockjs'


export default {

    // 返回值可以是数组形式
    'GET /api/users': [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' }
    ],
  
    // 返回值也可以是对象形式
    'GET /api/users/1': { id: 1, name: 'foo' },


    'GET /api/tags': mockjs.mock({
        'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
    }),
  
  }