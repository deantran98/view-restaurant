import prisma from '@/prisma/prisma-client'
import { TRPCError } from '@trpc/server'

export const getRestaurantsHandler = async () => {
  try {
    const restaurants = await prisma.restaurantRecord.findMany({})

    return {
      status: 'success',
      results: restaurants.length,
      data: {
        restaurants,
      },
    }
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}
