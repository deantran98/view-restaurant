import NavigationMenu from '../components/navigation-menu'
import { RestaurantRecord } from '../api/restaurants/route'
import RestaurantsList from './restaurants-list'

export default async function ViewRestaurantsPage() {
  const restaurantsResponse = await fetch(
    'http://localhost:3000/api/restaurants',
    {
      cache: 'no-store',
    }
  )

  if (!restaurantsResponse.ok) {
    throw new Error('Network response was not ok')
  }

  const restaurantRecords: RestaurantRecord[] = await restaurantsResponse.json()

  return (
    <div className="flex flex-col">
      <RestaurantsList restaurantRecords={restaurantRecords} />

      <div className="sticky bottom-0 bg-white">
        <NavigationMenu />
      </div>
    </div>
  )
}
