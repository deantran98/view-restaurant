import { t } from '@/utils/trpc-server'
import {
  addFavoriteRestaurantHandler,
  getRestaurantsHandler,
} from './restaurants-controller'
import { addFavoriteRestaurantSchema } from './restaurants-schema'

const restaurantsRouter = t.router({
  getRestaurants: t.procedure.query(() => getRestaurantsHandler()),

  addFavorite: t.procedure
    .input(addFavoriteRestaurantSchema)
    .mutation(({ input }) => addFavoriteRestaurantHandler({ input })),
})

export default restaurantsRouter
