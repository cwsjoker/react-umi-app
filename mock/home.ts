import mockjs from 'mockjs'


export default {
    
    'GET /api/user': mockjs.mock({
      'data|10': [{ 'name': /[a-z][A-Z][0-9]/, 'age|1-100': 50, 'type|0-2': 1 }],
      'message': '',
      'state': 0
    }),

    'POST /api/users/create': {
      'data': [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' }
      ],
      'message': '',
      'state': 0
    },

    'PUT /api/users': {
      'data': [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' }
      ],
      'message': '',
      'state': 0
    },

    'DELETE /api/users/10': {
      'data': [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' }
      ],
      'message': '',
      'state': 0
    },
  }