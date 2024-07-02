'use client'

import React from 'react'
import { Card, CardContent, Tooltip, Typography } from '@mui/material'
import Image from 'next/image'
import { Stars02SVGIcon } from '@/public/svg-icons/stars-02-icon'
import { StarSVGIcon } from '@/public/svg-icons/star-icon'
import { FIRST_ELEMENT_INDEX } from '../share/constant'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { trpc } from '@/utils/trpc'
import queryClient from '@/utils/query-client'
import { RestaurantRecord } from '@/lib/db-service'

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

  const { mutate } = trpc.addFavorite.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [['getRestaurants'], { type: 'query' }],
      })
    },
  })

  const onClickAddFavorite = async () => {
    mutate({ id: restaurantRecord.id, isFavorite: !isFavorite })
  }

  return (
    <Card sx={{ maxWidth: 355, borderRadius: '16px' }}>
      <div style={{ position: 'relative', width: '100%', height: '200px' }}>
        <div
          style={{
            position: 'absolute',
            top: '9px',
            right: '9px',
            zIndex: 1,
            backgroundColor: isFavorite ? 'red' : 'lightgray',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.8,
          }}
        >
          <FavoriteBorderIcon
            style={{ color: isFavorite ? 'pink' : 'white', cursor: 'pointer' }} // Add cursor style for visual feedback
            onClick={onClickAddFavorite}
          />
        </div>
        <Image
          src={images[FIRST_ELEMENT_INDEX]}
          alt={`Image of ${name}`}
          fill
          priority
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
