import { MOCK_RESTAURANTS_RESPONSE } from '@/mock/restaurants-response'
import { NextResponse } from 'next/server'

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

export async function GET(req: Request) {
  const restaurantsResponse: RestaurantRecord[] = MOCK_RESTAURANTS_RESPONSE

  return NextResponse.json(restaurantsResponse)
}
