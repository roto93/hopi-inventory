import { inter } from '@/_lib/fonts'
import { Row, Col, Checkbox } from 'antd'
import React, { FC } from 'react'
import styles from './products.module.scss'
import { Product } from '@/_lib/productQueries'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

interface Prop {
  product: Product
  selectedIDs?: string[]
  onClick: (clickedProductID: string) => void
}

const PruductRow: FC<Prop> = ({ product, selectedIDs, onClick }) => {

  const onChange = () => {
    onClick(product._id)
  }

  return (
    <Row className={`${styles.row} ${inter.className}`} >
      <Col span={1}>
        <Checkbox checked={selectedIDs?.some(id => id == product._id)} onChange={onChange} />
      </Col>
      <Col span={11}>
        <p className={styles.name}>{product.name}</p>
      </Col>
      <Col span={4}>
        <p className={styles.price}>${product.price}</p>
      </Col>
      <Col span={4}>
        <p className={styles.inventory}>{product.inventory}</p>
      </Col>
      <Col span={4}>
        <p className={styles.inventory}>{product.soldQuantity}</p>
      </Col>
    </Row>)
}

export default PruductRow