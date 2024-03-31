import { errorToast } from '@/_components/PiToasts'
import { addProductQuery } from '@/_lib/productQueries'
import { Button, Form, Input, InputNumber, InputRef, Modal } from 'antd'
import { useParams } from 'next/navigation'
import { FC, useRef } from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'
import { revalidateAction } from './revalidateAction'
import useAddProductForm, { productInputs } from './useAddProductForm'

interface Prop {
  isOpen: boolean
  close: () => void
}

const AddProductModal: FC<Prop> = ({ isOpen, close }) => {
  const { id: hostEventID } = useParams()
  const nameInputRef = useRef<InputRef | null>(null)

  const {
    registers,
    formState,
    handleSubmit,
    reset,
    watch,
    control
  } = useAddProductForm()

  const onSubmit: SubmitHandler<productInputs> = async (_data) => {
    try {
      // add hostEventID, soldQuantity
      _data = { ..._data, hostEventID: hostEventID as string }

      const data = await addProductQuery(_data)
      if (data.status === 'Success') {
        reset()
        revalidateAction('products')
        nameInputRef.current?.focus()
      }
    } catch (e: any) {
      console.log(e)
      errorToast(e.response.data.message[0])
    }
  }

  const onCancel = () => {
    close()
    reset()
  }

  return (
    <Modal
      maskClosable={false}
      open={isOpen}
      onOk={handleSubmit(onSubmit)}
      onCancel={onCancel}
      keyboard={false}
      footer={null}
    >
      <Form
        layout='vertical'
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item
          label={'商品名稱'}
          hasFeedback={false}
          help={formState.errors.name?.message}
        >
          <Controller
            name={'name'}
            control={control}
            render={({ field }) => (
              <Input {...field} autoComplete='off' placeholder='name' ref={nameInputRef} />
            )}
          />


        </Form.Item>

        <Form.Item
          label={'庫存'}
          hasFeedback={false}
          help={formState.errors.inventory?.message}
        >
          <Controller
            name={'inventory'}
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                placeholder='eg. 20'
                autoComplete='off'
                style={{ width: '100%' }}
              />
            )}
          />
        </Form.Item>


        <Form.Item
          label={'單價'}
          hasFeedback={false}
          help={formState.errors.price?.message}
        >
          <Controller
            name={'price'}
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                prefix="$"
                placeholder='100'
                autoComplete='off'
                style={{ width: '100%' }}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={'已賣出數量'}
          hasFeedback={false}
          help={formState.errors.soldQuantity?.message}
        >
          <Controller
            name={'soldQuantity'}
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                placeholder='0'
                autoComplete='off'
                style={{ width: '100%' }}
              />
            )}
          />
        </Form.Item>


        <div style={{ marginTop: 40 }}>
          <Button htmlType='submit' type='primary' block>Create</Button>
        </div>
      </Form>
    </Modal>
  )
}

export default AddProductModal