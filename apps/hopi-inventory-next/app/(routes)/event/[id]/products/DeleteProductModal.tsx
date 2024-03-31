import { useDeletingProduct } from '@/_atoms/product.atom';
import { deleteProductQuery } from '@/_lib/productQueries';
import { Modal } from 'antd';
import { FC } from 'react';
import { revalidateAction } from './revalidateAction';

interface Prop {
}

const DeleteProductModal: FC<Prop> = () => {
  const [deletingProduct, setDeletingProduct] = useDeletingProduct()

  const openModal = Boolean(deletingProduct)

  const onDelete = async () => {
    try {
      if (!deletingProduct) return
      await deleteProduct(deletingProduct._id)
      setDeletingProduct(undefined)
    } catch (e) {
      console.log(e)
    }
  }

  const onCancel = () => {
    setDeletingProduct(undefined)
  }

  return (
    <Modal
      open={openModal}
      onCancel={onCancel}
      okText={'刪除'}
      cancelText={'取消'}
      okType='danger'
      onOk={onDelete}
    >
      <h2>確定要刪除「{deletingProduct?.name}」嗎？</h2>
    </Modal>)
}

export default DeleteProductModal

const deleteProduct = async (id: string) => {
  const deletedProduct = await deleteProductQuery(id)
  console.log(deletedProduct)
  revalidateAction('products')
}