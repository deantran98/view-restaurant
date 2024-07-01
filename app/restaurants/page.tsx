import NavigationMenu from '../components/navigation-menu'
import RestaurantsList from './restaurants-list'
import prisma from '@/lib/db'
import { mapDBResponseToRestaurantRecords } from '@/lib/db-service'

export default async function ViewRestaurantsPage() {
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

  const dbResponse = await prisma.restaurantRecord.findMany()

  const restaurantRecords = mapDBResponseToRestaurantRecords(dbResponse)

  return (
    <div className="flex flex-col">
      <RestaurantsList restaurantRecords={restaurantRecords} />

      <div className="sticky bottom-0 bg-white">
        <NavigationMenu />
      </div>
    </div>
  )
}
