import React from 'react'
import styles from './products.module.scss'
import { Col, Row } from 'antd'

const ProductListHeader = () => {
  return (
    <Row className={styles.headRow}>
      <Col span={1}></Col>
      <Col span={11}>名稱</Col>
      <Col span={3}>價格</Col>
      <Col span={3}>庫存</Col>
      <Col span={3}>售出</Col>
      <Col span={3}>動作</Col>
    </Row>
  )
}

export default ProductListHeader