export const defaultGraph = {
  nodes: [
    {
      id: 'ca98730e-a40f-4601-98cc-b5a57429596d',
      type: 'inputNode',
      position: {
        x: 70,
        y: 250,
      },
      name: 'Request',
    },
    {
      id: 'c5e747fe-b74b-4b74-9fd0-bfd7d67007c3',
      type: 'outputNode',
      position: {
        x: 570,
        y: 250,
      },
      name: 'Response',
    },
    {
      id: '359173d8-0068-45f8-bb71-8240ad73201d',
      type: 'decisionTableNode',
      position: {
        x: 320,
        y: 250,
      },
      name: 'decisionTableNode 1',
      content: {
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
            '_description': 'If weight is above 40kg and any other country, fee is 50',
            'HVo_JpALi8': '> 40',
            'HW6mSVfLbs': '',
            '3EGDrV0ssV': '50',
          },
          {
            '_id': 'k-zEFSTe7b',
            '_description': 'if weight is between 20 and 40kg and country US, fee is 30',
            'HVo_JpALi8': '[20..40]',
            'HW6mSVfLbs': '"US"',
            '3EGDrV0ssV': '30',
          },
          {
            '_id': 'c_8VkmGZ_C',
            '_description': 'if weight is between 20 and 40kg and any other country, fee is 32',
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
      },
    },
  ],
  edges: [
    {
      id: '1d5f4787-4c86-4ed9-99dc-1a3159f65d89',
      sourceId: 'ca98730e-a40f-4601-98cc-b5a57429596d',
      type: 'edge',
      targetId: '359173d8-0068-45f8-bb71-8240ad73201d',
    },
    {
      id: 'c5d49d3a-fdfd-4f4b-8838-791cee4d4a55',
      sourceId: '359173d8-0068-45f8-bb71-8240ad73201d',
      type: 'edge',
      targetId: 'c5e747fe-b74b-4b74-9fd0-bfd7d67007c3',
    },
  ],
};
