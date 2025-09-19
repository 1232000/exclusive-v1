import { IPagination } from "@/interface/pagination.interface"

export interface ICategoryResponse {
  results: number
  metadata: IPagination
  
  data: ICategory[]
}

export interface ICategory {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
