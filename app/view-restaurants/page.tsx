import NavigationMenu from '../components/navigation-menu'
import { RestaurantRecord } from '../api/restaurants/route'
import RestaurantRecordWrapper from '../components/record-wrapper'

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
    <div className="flex min-h-screen flex-col items-center bg-white">
      <div className="space-y-4 overflow-auto pb-16">
        {restaurantRecords.map((item, index) => (
          <RestaurantRecordWrapper key={index} restaurantRecord={item} />
        ))}
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-white">
        <NavigationMenu />
      </div>
    </div>
  )
}
