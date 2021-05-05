/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import { LocaleProvider, ConfigProvider } from 'antd'
import 'antd/dist/antd.css'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

const Wrapper = ({ children }) => (
  <LocaleProvider locale={zh_CN}>
    <ConfigProvider getPopupContainer={e => e.parentNode}>{children}</ConfigProvider>
  </LocaleProvider>
)

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Wrapper
