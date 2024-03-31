import { useForm } from 'react-hook-form'

export type productInputs = {
  name: string,
  inventory: number
  soldQuantity: number
  price: number
  image?: string
  categoryID?: string
  hostEventID: string
}

const useAddProductForm = () => {
  const {
    register,
    watch,
    ...rest
  } = useForm<productInputs>()

  const nameRegister = register('name', {
    required: 'Name is required.',

  })

  const inventoryRegister = register('inventory', {
    required: 'Inventory is required.'
  })

  const priceRegister = register('price', {
    required: 'Price is required.'
  })

  const soldQuantityRegister = register('soldQuantity', {
    required: 'Sold quantity is required.'
  })

  const imageRegister = register('image', {

  })

  return {
    registers: {
      name: nameRegister,
      inventory: inventoryRegister,
      price: priceRegister,
      soldQuantity: soldQuantityRegister,
      image: imageRegister
    },
    watch,
    ...rest
  }
}

export default useAddProductForm