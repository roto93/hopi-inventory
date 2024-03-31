'use client'
import { Product } from '@/_lib/productQueries'
import { Button } from 'antd'
import { FC, useState } from 'react'
import AddProductModal from './AddProductModal'
import DeleteProductModal from './DeleteProductModal'
import ProductListHeader from './ProductListHeader'
import PruductRow from './PruductRow'
import styles from './products.module.scss'

interface Prop {
  products: Product[]
}

const Products: FC<Prop> = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const [selectedProductIDs, setSelectedProductIDs] = useState<string[]>([]);


  const onAddClick = () => {
    openModal()
  }


  const selectProduct = (productID: string) => {
    const newIDs = selectedProductIDs.some(id => id === productID)
      ? selectedProductIDs.filter(id => id !== productID)
      : [...selectedProductIDs, productID]

    setSelectedProductIDs(newIDs)
  }


  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1 className={styles.title}>All Products</h1>
        <Button onClick={onAddClick}>Add New</Button>
      </header>

      <ul className={styles.productList}>
        <ProductListHeader />
        {products.map(product => (
          <PruductRow
            key={product._id}
            product={product}
            selectedIDs={selectedProductIDs}
            onSelect={selectProduct}
          />
        ))}
      </ul>

      <AddProductModal
        isOpen={isModalOpen}
        close={closeModal}
      />

      <DeleteProductModal />

    </div>
  )
}

export default Products