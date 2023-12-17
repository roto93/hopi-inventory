import toast, { Renderable, Toaster, ValueOrFunction } from "react-hot-toast";

export const successToast = (msg: string) => {
  toast.dismiss('success')
  toast.success(msg, { id: 'success' })
}
export const errorToast = (msg: string) => {
  toast.dismiss('error')
  toast.error(msg, { id: 'error' })
}

interface piPromiseOption {
  loading: string
  success: ValueOrFunction<Renderable, unknown>
  error: ValueOrFunction<Renderable, any>
}

export const promiseToast = (promise: Promise<unknown>, options?: Partial<piPromiseOption>, id?: string) => toast.promise(promise, {
  loading: options?.loading ?? 'Processing...',
  success: options?.success ?? 'Success.',
  error: options?.error ?? ((e) => (e))
}, {
  id: id,
  success: { id: id ?? 'success' },
  error: { id: id ?? 'error' },
  loading: { id: id ?? 'loading' }
})

export const PiToast = () => {
  return (
    <Toaster
      toastOptions={{
        duration: 3000
      }}
    />
  )
}