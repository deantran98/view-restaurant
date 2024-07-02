'use client'

import { trpc } from '@/utils/trpc'
import NavigationMenu from '../components/navigation-menu'
import RestaurantsList from './restaurants-list'
import prisma from '@/lib/db'
import { mapDBResponseToRestaurantRecords } from '@/lib/db-service'

export default function ViewRestaurantsPage() {
  // const restaurantsResponse = await fetch(
  //   'http://localhost:3000/api/restaurants',
  //   {
  //     cache: 'no-store',
  //   }
  // )

  // if (!restaurantsResponse.ok) {
  //   throw new Error('Network response was not ok')
  // }

  // const restaurantRecords: RestaurantRecord[] = await restaurantsResponse.json()

  const { data } = trpc.getRestaurants.useQuery()

  // const dbResponse = await prisma.restaurantRecord.findMany()

  const restaurantRecords = mapDBResponseToRestaurantRecords(
    data?.data.restaurants
  )

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <RestaurantsList restaurantRecords={restaurantRecords} />
      </div>

      <div className="sticky bottom-0 bg-white">
        <NavigationMenu />
      </div>
    </div>
  )
}
