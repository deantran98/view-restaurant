import React from 'react'
import { Card, CardContent, Tooltip, Typography } from '@mui/material'
import { RestaurantRecord } from '../api/restaurants/route'
import Image from 'next/image'
import { Stars02SVGIcon } from '@/public/svg-icons/stars-02-icon'
import { StarSVGIcon } from '@/public/svg-icons/star-icon'

interface RestaurantRecordWrapperProps {
  restaurantRecord: RestaurantRecord
}

const RestaurantRecordWrapper: React.FC<RestaurantRecordWrapperProps> = ({
  restaurantRecord,
}) => {
  const {
    images,
    featured,
    name,
    desc,
    price_range,
    rating,
    rating_count,
    isFavorite,
  } = restaurantRecord

  return (
    <Card sx={{ maxWidth: 355 }}>
      <div style={{ position: 'relative', width: '100%', height: '140px' }}>
        <Image
          src={images[0]}
          alt={`Image of ${name}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent>
        <Typography gutterBottom variant="body2" color="#FF692E">
          {featured.icon === 'stars-02' ? (
            <>
              <Stars02SVGIcon />{' '}
            </>
          ) : (
            ''
          )}
          {featured.text}
        </Typography>

        <div className="flex items-center justify-between">
          <Tooltip title={name}>
            <Typography variant="h5" component="div" className="truncate">
              {name}
            </Typography>
          </Tooltip>
          <Typography variant="h6" color="text.secondary">
            <div className="flex flex-shrink-0 items-center">
              <StarSVGIcon />
              {` ${rating}(${rating_count})`}
            </div>
          </Typography>
        </div>

        <Tooltip title={desc}>
          <Typography
            variant="h6"
            color="text.secondary"
            component="div"
            className="truncate"
          >
            {desc}
          </Typography>
        </Tooltip>

        <Typography variant="h6" color="text.secondary">
          {`오사카 나카노시마 · 야키토리${price_range ? ` · ${price_range}만원` : ''}`}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default RestaurantRecordWrapper
