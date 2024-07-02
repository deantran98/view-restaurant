export type RestaurantRecord = {
  rating: number
  rating_count: number
  category: string
  city: string
  desc: string
  id: string
  images: string[]
  name: string
  price_range: string
  featured: {
    text: string
    icon: string
  }
  isFavorite: boolean
}

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
