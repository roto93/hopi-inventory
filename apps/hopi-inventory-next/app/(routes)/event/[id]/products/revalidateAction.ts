'use server'

import { revalidateTag } from "next/cache"

export const revalidateAction = (tag: string) => {
  revalidateTag(tag)
}