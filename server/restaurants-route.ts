import { t } from '@/utils/trpc-server'
import { getRestaurantsHandler } from './restaurants-controller'

const restaurantsRouter = t.router({
  getRestaurants: t.procedure.query(() => getRestaurantsHandler()),
})

export default restaurantsRouter
