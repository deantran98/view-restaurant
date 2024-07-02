'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import RestaurantRecordWrapper from '../components/record-wrapper'
import { Toolbar, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {
  FIRST_ELEMENT_INDEX,
  RECORDS_PER_LOAD_AND_DISPLAY,
  THREE_SECOND_IN_MILLISECONDS,
} from '../share/constant'
import { RestaurantRecord } from '@/lib/db-service'

interface RestaurantsListProps {
  restaurantRecords: RestaurantRecord[]
}

const RestaurantsList: React.FC<RestaurantsListProps> = ({
  restaurantRecords,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const [displayCount, setDisplayCount] = useState(RECORDS_PER_LOAD_AND_DISPLAY)
  const sentinelRef = useRef(null)

  const onSearchChange = (e: any) => {
    const searchTerm = e.target.value

    setSearchQuery(searchTerm)

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const newTimeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchTerm)
    }, THREE_SECOND_IN_MILLISECONDS)

    setTimeoutId(newTimeoutId)
  }

  // Memoize filtered records to prevent unnecessary recalculations
  const filteredRecords = useMemo(() => {
    return restaurantRecords
      .filter((item) => {
        const searchLower = debouncedSearchQuery.toLowerCase()
        const nameMatch = item.name.toLowerCase().includes(searchLower)
        const ratingMatch = item.rating.toString().includes(searchLower)

        return nameMatch || ratingMatch
      })
      .sort((current, next) => next.rating - current.rating)
      .slice(FIRST_ELEMENT_INDEX, displayCount)
  }, [debouncedSearchQuery, restaurantRecords, displayCount])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[FIRST_ELEMENT_INDEX].isIntersecting) {
          setDisplayCount(
            (prevCount) => prevCount + RECORDS_PER_LOAD_AND_DISPLAY
          )
        }
      },
      { threshold: 1.0 }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => {
      if (sentinelRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sentinelRef.current)
      }
    }
  }, [])

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 mt-4 bg-white md:px-8">
        <Toolbar>
          <TextField
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={onSearchChange}
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
          {filteredRecords.map((item, index) => (
            <RestaurantRecordWrapper key={index} restaurantRecord={item} />
          ))}
          <div ref={sentinelRef} className="h-5"></div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantsList
