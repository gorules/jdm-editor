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
        x: 670,
        y: 250,
      },
      name: 'Response',
    },
    {
      id: '359173d8-0068-45f8-bb71-8240ad73201d',
      type: 'decisionTableNode',
      position: {
        x: 370,
        y: 250,
      },
      name: 'decisionTableNode 1',
      content: {
        hitPolicy: 'first',
        inputs: [
          {
            id: 'HVo_JpALi8',
            field: 'cart.weight',
            name: 'Cart Weight (Kg)',
          },
          {
            id: 'HW6mSVfLbs',
            field: 'customer.country',
            name: 'Customer Country',
          },
        ],
        outputs: [
          {
            field: 'shippingFee',
            id: '3EGDrV0ssV',
            name: 'Shipping Fee',
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

export const defaultGraphCustomNode = {
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
        x: 675,
        y: 250,
      },
      name: 'Response',
    },
    {
      id: 'a70ede61-ba67-46fb-af25-c2d22afb2f0e',
      type: 'customNode',
      name: 'pingNode1',
      position: {
        x: 375,
        y: 250,
      },
      content: {
        kind: 'pingNode',
        config: {},
      },
    },
  ],
  edges: [
    {
      id: 'd306fcd9-5d16-4f15-8677-c59098db5bfe',
      sourceId: 'ca98730e-a40f-4601-98cc-b5a57429596d',
      type: 'edge',
      targetId: 'a70ede61-ba67-46fb-af25-c2d22afb2f0e',
    },
    {
      id: 'a1a64d21-4248-45cd-8502-30d47ac685d0',
      sourceId: 'a70ede61-ba67-46fb-af25-c2d22afb2f0e',
      type: 'edge',
      targetId: 'c5e747fe-b74b-4b74-9fd0-bfd7d67007c3',
    },
  ],
};

export const defaultGraphInputsFormCustomNode = {
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
        x: 675,
        y: 250,
      },
      name: 'Response',
    },
    {
      id: 'a70ede61-ba67-46fb-af25-c2d22afb2f0e',
      type: 'customNode',
      name: 'inputsNode1',
      position: {
        x: 375,
        y: 250,
      },
      content: {
        kind: 'inputsNode',
        config: {
          'hello.nested.something': 'My',
          'second': 'Name',
          'checkbox': true,
        },
      },
    },
  ],
  edges: [
    {
      id: 'd306fcd9-5d16-4f15-8677-c59098db5bfe',
      sourceId: 'ca98730e-a40f-4601-98cc-b5a57429596d',
      type: 'edge',
      targetId: 'a70ede61-ba67-46fb-af25-c2d22afb2f0e',
    },
    {
      id: 'a1a64d21-4248-45cd-8502-30d47ac685d0',
      sourceId: 'a70ede61-ba67-46fb-af25-c2d22afb2f0e',
      type: 'edge',
      targetId: 'c5e747fe-b74b-4b74-9fd0-bfd7d67007c3',
    },
  ],
};

export const defaultGraphUnknownNode = {
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
        x: 685,
        y: 250,
      },
      name: 'Response',
    },
    {
      id: 'dc75f8e9-ea03-4de1-b48a-1d5b52076c66',
      type: 'customNode',
      name: 'pingNode1',
      position: {
        x: 380,
        y: 205,
      },
      content: {
        kind: 'pingNode',
        config: {},
      },
    },
    {
      id: 'c25d895a-826d-4e8b-9477-cd5b368fe3e6',
      type: 'customNode',
      name: 'Test Node',
      position: {
        x: 380,
        y: 300,
      },
      content: {
        kind: 'unknownNode',
        config: {},
      },
    },
  ],
  edges: [
    {
      id: 'f9695843-7e91-4e93-b92e-8611e40dc1b7',
      sourceId: 'ca98730e-a40f-4601-98cc-b5a57429596d',
      type: 'edge',
      targetId: 'c25d895a-826d-4e8b-9477-cd5b368fe3e6',
    },
    {
      id: 'fe2781c3-4495-4c01-9cf7-253954afc753',
      sourceId: 'ca98730e-a40f-4601-98cc-b5a57429596d',
      type: 'edge',
      targetId: 'dc75f8e9-ea03-4de1-b48a-1d5b52076c66',
    },
    {
      id: '04bfffb2-2cca-407a-b8d6-dc0f8431253c',
      sourceId: 'dc75f8e9-ea03-4de1-b48a-1d5b52076c66',
      type: 'edge',
      targetId: 'c5e747fe-b74b-4b74-9fd0-bfd7d67007c3',
    },
    {
      id: '3f382611-9a8d-4405-ae80-0e607bb97f42',
      sourceId: 'c25d895a-826d-4e8b-9477-cd5b368fe3e6',
      type: 'edge',
      targetId: 'c5e747fe-b74b-4b74-9fd0-bfd7d67007c3',
    },
  ],
};
