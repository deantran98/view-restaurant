import { TypeOf, boolean, object, string } from 'zod'

export const addFavoriteRestaurantSchema = object({
  id: string({ required_error: 'Id is required' }),
  isFavorite: boolean({ required_error: 'Favorite status is required' }),
})

export type AddFavoriteRestaurantInput = TypeOf<
  typeof addFavoriteRestaurantSchema
>
