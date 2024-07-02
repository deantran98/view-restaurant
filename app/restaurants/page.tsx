'use client'

import { trpc } from '@/utils/trpc'
import NavigationMenu from '../components/navigation-menu'
import RestaurantsList from './restaurants-list'
import { mapDBResponseToRestaurantRecords } from '@/lib/db-service'

export default function ViewRestaurantsPage() {
  const { data } = trpc.getRestaurants.useQuery()

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
