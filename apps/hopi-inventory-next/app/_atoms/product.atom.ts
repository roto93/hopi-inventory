import { Product } from "@/_lib/productQueries";
import { atom, useAtom } from "jotai";

const deletingProductAtom = atom<Product | undefined>(undefined)

export const useDeletingProduct = () => {
  return useAtom(deletingProductAtom)
}