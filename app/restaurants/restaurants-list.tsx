'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { RestaurantRecord } from '../api/restaurants/route'
import RestaurantRecordWrapper from '../components/record-wrapper'
import { Toolbar, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { RECORDS_PER_LOAD_AND_DISPLAY } from '../share/constant'

interface RestaurantsListProps {
  restaurantRecords: RestaurantRecord[]
}

const RestaurantsList: React.FC<RestaurantsListProps> = ({
  restaurantRecords,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleRecords, setVisibleRecords] = useState<RestaurantRecord[]>([])
  const loadMoreRef = useRef(null)

  // Memoize filtered records to prevent unnecessary recalculations
  const filteredRecords = useMemo(() => {
    return restaurantRecords.filter((item) => {
      const searchLower = searchQuery.toLowerCase()
      const nameMatch = item.name.toLowerCase().includes(searchLower)
      const ratingMatch = item.rating.toString().includes(searchLower)

      return nameMatch || ratingMatch
    })
  }, [searchQuery, restaurantRecords])

  // Update visible records initially and on search query change
  useEffect(() => {
    setVisibleRecords(filteredRecords.slice(0, 10))
  }, [filteredRecords])

  // IntersectionObserver for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleRecords((prevRecords) => {
            const nextRecords = filteredRecords.slice(
              prevRecords.length,
              prevRecords.length + RECORDS_PER_LOAD_AND_DISPLAY
            )
            return [...prevRecords, ...nextRecords]
          })
        }
      },
      { threshold: 1 }
    )
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }
    return () => observer.disconnect()
  }, [filteredRecords])

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 mt-4 bg-white md:px-8">
        <Toolbar>
          <TextField
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
      </div>

      <div className="mt-8 flex-grow overflow-auto">
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:flex-wrap sm:gap-8 sm:space-y-0 md:gap-16">
          {visibleRecords.map((item, index) => (
            <RestaurantRecordWrapper key={index} restaurantRecord={item} />
          ))}
          {visibleRecords.length < filteredRecords.length && (
            <div ref={loadMoreRef} />
          )}
        </div>
      </div>
    </div>
  )
}

export default RestaurantsList
