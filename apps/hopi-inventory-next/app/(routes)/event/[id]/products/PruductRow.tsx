import { useDeletingProduct } from '@/_atoms/product.atom'
import { inter } from '@/_lib/fonts'
import { Product } from '@/_lib/productQueries'
import { Button, Checkbox, Col, Row } from 'antd'
import { FC } from 'react'
import styles from './products.module.scss'

interface Prop {
  product: Product
  selectedIDs?: string[]
  onSelect: (clickedProductID: string) => void
}

const PruductRow: FC<Prop> = ({ product, selectedIDs, onSelect }) => {

  const handleCheck = () => {
    onSelect(product._id)
  }

  const openEditModel = () => { }

  const [, setDeletingProduct] = useDeletingProduct()

  return (
    <Row className={`${styles.row} ${inter.className}`} >
      <Col span={1}>
        <Checkbox
          checked={selectedIDs?.some(id => id == product._id)}
          onChange={handleCheck}
        />
      </Col>
      <Col span={11}>
        <p className={styles.name}>{product.name}</p>
      </Col>
      <Col span={3}>
        <p className={styles.price}>${product.price}</p>
      </Col>
      <Col span={3}>
        <p className={styles.inventory}>{product.inventory}</p>
      </Col>
      <Col span={3}>
        <p className={styles.inventory}>{product.soldQuantity}</p>
      </Col>
      <Col span={3} style={{ display: 'flex', gap: 8 }}>
        <Button size='small' className={styles.inventory} onClick={() => openEditModel()}>Edit</Button>
        <Button danger size='small' className={styles.inventory} onClick={() => {
          setDeletingProduct(product)
        }}>Delete</Button>
      </Col>
    </Row>
  )
}

export default PruductRow