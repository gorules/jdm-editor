import type { Meta, StoryObj } from '@storybook/react'
import React, { useEffect } from 'react'

import { DecisionTable } from './dt'
import { useDecisionTable } from './dt.hook'

const shippingFeesDefault = {
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
}
//
// const inputSchemaDefault = [
//   {
//     field: 'cart',
//     name: 'Cart',
//     items: [
//       {
//         field: 'cart.total',
//         name: 'Total',
//       },
//       {
//         field: 'cart.weight',
//         name: 'Weight',
//       },
//     ],
//   },
//   {
//     field: 'customer',
//     name: 'Customer',
//     items: [
//       {
//         field: 'customer.country',
//         name: 'Country',
//       },
//     ],
//   },
// ]

const stressRules = () => {
  const stressRules: any[] = []

  for (let i = 10_000; i > 0; i--) {
    stressRules.push({
      '_id': `${i}`,
      '_description': `${i} description`,
      'HVo_JpALi8': `> ${i}`,
      'HW6mSVfLbs': '"US"',
      '3EGDrV0ssV': `${i}`,
    })
  }

  return stressRules
}

const meta: Meta<typeof DecisionTable> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Decision Table',
  component: DecisionTable,
  argTypes: {
    // configurable: { control: 'boolean' },
    // disabled: { control: 'boolean' },
    // cellRenderer: {
    //   control: false,
    // },
  },
  args: {
    // inputsSchema: inputSchemaDefault,
    // configurable: true,
    // disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof DecisionTable>

export const Uncontrolled: Story = {
  render: () => {
    const store = useDecisionTable()
    return (
      <div>
        <DecisionTable store={store} tableHeight='500px' />
      </div>
    )
  },
}
//
// export const Controlled: Story = {
//   render: (args) => {
//     const [value, setValue] = useState<DecisionTableProps>(shippingFeesDefault)
//     return (
//       <div>
//         <DecisionTable
//           {...args}
//           tableHeight='500px'
//           value={value}
//           onChange={(val) => setValue(val)}
//         />
//       </div>
//     )
//   },
// }
//
// export const NonBodyDialogsMount: Story = {
//   render: (args) => {
//     return (
//       <div>
//         <DecisionTable {...args} tableHeight='500px' mountDialogsOnBody={false} />
//       </div>
//     )
//   },
// }
//
// export const Empty: Story = {
//   render: (args) => (
//     <div>
//       <DecisionTable {...args} tableHeight='500px' />
//     </div>
//   ),
// }
//
// export const CustomRenderer: Story = {
//   render: (args) => (
//     <div>
//       <DecisionTable
//         {...args}
//         tableHeight='500px'
//         cellRenderer={(props) => {
//           if (props?.column?.field === 'output') {
//             return (
//               <div tabIndex={1} style={{ paddingLeft: '1rem' }}>
//                 <Checkbox
//                   disabled={props.disabled}
//                   checked={props.value === 'true'}
//                   onChange={(e) => {
//                     props.onChange(`${e?.target?.checked}`)
//                   }}
//                 >
//                   Enabled
//                 </Checkbox>
//               </div>
//             )
//           }
//           return null
//         }}
//       />
//     </div>
//   ),
// }

export const StressTest: Story = {
  render: () => {
    const store = useDecisionTable()
    useEffect(() => {
      store.getState().setDecisionTable({
        ...shippingFeesDefault,
        rules: stressRules(),
      })
    }, [])
    return (
      <div>
        <DecisionTable store={store} tableHeight='500px' />
      </div>
    )
  },
}
