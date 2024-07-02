import { RestaurantRecord } from '@/app/api/restaurants/route'

export function mapDBResponseToRestaurantRecords(
  dbResponse: any[] | undefined
): RestaurantRecord[] {
  if (!dbResponse) {
    return []
  }

  return dbResponse.map((restaurant: any) => ({
    id: restaurant.id,
    name: restaurant.name,
    category: restaurant.category,
    city: restaurant.city,
    desc: restaurant.desc,
    rating: restaurant.rating,
    rating_count: restaurant.rating_count,
    price_range: restaurant.price_range,
    images: restaurant.images,
    featured: restaurant.featured,
    isFavorite: restaurant.isFavorite,
  }))
}
