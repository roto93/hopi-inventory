import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import React, { FC, ReactNode } from 'react'

interface Prop {
  children: ReactNode
}

const AntdProvider: FC<Prop> = ({ children }) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Inter'
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  )
}

export default AntdProvider