import prisma from '@/prisma/prisma-client'
import { TRPCError } from '@trpc/server'
import { AddFavoriteRestaurantInput } from './restaurants-schema'
import { revalidatePath } from 'next/cache'

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

export const addFavoriteRestaurantHandler = async ({
  input,
}: {
  input: AddFavoriteRestaurantInput
}) => {
  try {
    const { id, isFavorite } = input

    const updatedRestaurant = await prisma.restaurantRecord.update({
      where: {
        id: id,
      },
      data: {
        isFavorite: isFavorite,
      },
    })

    revalidatePath('/api/restaurants')

    return updatedRestaurant
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}
