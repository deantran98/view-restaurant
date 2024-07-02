import { TypeOf, boolean, object } from 'zod'

export const addFavoriteRestaurantSchema = object({
  isFavorite: boolean(),
})

export type AddFavoriteRestaurantInput = TypeOf<
  typeof addFavoriteRestaurantSchema
>
