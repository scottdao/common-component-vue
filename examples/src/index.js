import React from 'react'
import { render } from 'react-dom'
import { LocaleProvider, ConfigProvider } from 'antd'

import 'antd/dist/antd.css'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import MyComponent from '../../src/index'

const App = () => (
  <LocaleProvider locale={zh_CN}>
    <ConfigProvider getPopupContainer={e => e.parentNode}>
      <MyComponent />
    </ConfigProvider>
  </LocaleProvider>
)

render(<App />, document.getElementById('root'))
