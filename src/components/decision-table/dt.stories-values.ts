export const shippingFeesDefault = {
  hitPolicy: 'first',
  inputs: [
    {
      id: 'HVo_JpALi8',
      type: 'expression',
      field: 'cart.weight',
      name: 'Cart Weight (Kg)',
    },
    {
      id: 'HW6mSVfLbs',
      type: 'expression',
      field: 'customer.country',
      name: 'Customer Country',
    },
  ],
  outputs: [
    {
      field: 'shippingFee',
      id: '3EGDrV0ssV',
      name: 'Shipping Fee',
      type: 'expression',
    },
  ],
  rules: [
    {
      '_id': 'qMpJEvcau6',
      '_description': 'If weight is above 40kg and country is US, fee is 40',
      'HVo_JpALi8': '> 40',
      'HW6mSVfLbs': '"US"',
      '3EGDrV0ssV': '40',
    },
    {
      '_id': 'KC6KqcWiOX',
      '_description':
        'If weight is above 40kg and any other country, fee is 50',
      'HVo_JpALi8': '> 40',
      'HW6mSVfLbs': '',
      '3EGDrV0ssV': '50',
    },
    {
      '_id': 'k-zEFSTe7b',
      '_description':
        'if weight is between 20 and 40kg and country US, fee is 30',
      'HVo_JpALi8': '[20..40]',
      'HW6mSVfLbs': '"US"',
      '3EGDrV0ssV': '30',
    },
    {
      '_id': 'c_8VkmGZ_C',
      '_description':
        'if weight is between 20 and 40kg and any other country, fee is 32',
      'HVo_JpALi8': '[20..40]',
      'HW6mSVfLbs': '',
      '3EGDrV0ssV': '32',
    },
    {
      '_id': 'e_MyQeTS3V',
      '_description': 'if weight is bellow 20kg and country US, fee is 25',
      'HVo_JpALi8': '< 20',
      'HW6mSVfLbs': '"US"',
      '3EGDrV0ssV': '25',
    },
    {
      '_id': '_iU8FNLxHb',
      '_description': 'if weight is bellow 20kg, fee is 30',
      'HVo_JpALi8': '< 20',
      'HW6mSVfLbs': '',
      '3EGDrV0ssV': '30',
    },
  ],
}

export const inputSchemaDefault = [
  {
    field: 'cart',
    name: 'Cart',
    items: [
      {
        field: 'cart.total',
        name: 'Total',
      },
      {
        field: 'cart.weight',
        name: 'Weight',
      },
    ],
  },
  {
    field: 'customer',
    name: 'Customer',
    items: [
      {
        field: 'customer.country',
        name: 'Country',
      },
    ],
  },
]

export const stressRules: any[] = []
for (let i = 10000; i > 0; i--) {
  stressRules.push({
    '_id': `${i}`,
    '_description': `${i} description`,
    'HVo_JpALi8': `> ${i}`,
    'HW6mSVfLbs': '"US"',
    '3EGDrV0ssV': `${i}`,
  })
}
