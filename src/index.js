import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Button, Form, Select } from 'antd'
import {
  DrawerGroup,
  InnerDrawer,
  CascadeSelect,
  InnerSelect,
  NewRangeSelectableRangePicker,
} from './components'

const ButtonGroup = Button.Group
const { Item } = Form
const { Option } = Select

const MyComponent = props => {
  const [showedDrawerKey, setShowedDrawerKey] = useState({})

  const parent = [
    { key: 1, value: 'a' },
    { key: 2, value: 'b' },
    { key: 3, value: 'c' },
    { key: 4, value: 'd' },
  ]
  const children = {
    1: ['a-1', 'a-2', 'a-3', 'a-4'],
    2: ['b-1', 'b-2', 'b-3', 'b-4'],
    3: ['c-1', 'c-2', 'c-3', 'c-4'],
    4: ['d-1', 'd-2', 'd-3', 'd-4'],
  }

  const gfd = props.form.getFieldDecorator

  return (
    <div style={{ position: 'absolute', top: 100, left: 100, padding: 24 }}>
      <ButtonGroup>
        {[0, 1, 2, 3].map(item => (
          <Button onClick={() => setShowedDrawerKey({ key: `${item}` })}>{item}</Button>
        ))}
      </ButtonGroup>
      <DrawerGroup showedDrawerKey={showedDrawerKey}>
        <InnerDrawer width="1000" key="0">
          0<Button onClick={() => setShowedDrawerKey({ key: '3' })}>3</Button>
        </InnerDrawer>
        <InnerDrawer key="1">1</InnerDrawer>
        <InnerDrawer key="2" width="1000">
          2<Button onClick={() => setShowedDrawerKey({ key: '2' })}>2</Button>
        </InnerDrawer>
        <InnerDrawer key="3">
          3<Button onClick={() => setShowedDrawerKey({ key: '2' })}>2</Button>
        </InnerDrawer>
      </DrawerGroup>
      <NewRangeSelectableRangePicker
        value={{ range: '自定义' }}
        selectableTimes={['day', 'week', 'month', '自定义']}
        onChange={(value, range, timeRange) => {
          console.log(value, range, timeRange)
        }}
        allowClear={false}
        nowBefore
      />
      {/* <Form>
        <Item label="级联选择">
          {gfd('multiSelect')(
            <CascadeSelect
              parentOptions={parent}
              childrenOptions={children}
              style={{ display: 'flex', justifyContent: 'space-between', width: 300 }}
            >
              <InnerSelect
                style={{ width: '48%' }}
                optionMapFn={({ value, key }) => <Option key={key}>{value}</Option>}
              />
              <InnerSelect style={{ width: '48%' }} mode="multiple" />
            </CascadeSelect>,
          )}
        </Item>
      </Form>
      <Button
        onClick={() => {
          props.form.validateFields((err, value) => {
            console.log(value)
          })
        }}
      >
        提交
      </Button> */}
    </div>
  )
}

export default Form.create({})(MyComponent)
