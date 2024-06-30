'use client'

import React from 'react'
import { Button } from '@mui/material'
import { SearchSVGIcon } from '@/public/svg-icons/search-svg-icon'
import { HomeSVGIcon } from '@/public/svg-icons/home-svg-icon'
import { MenuSVGIcon } from '@/public/svg-icons/menu-svg-icon'
import { CalendarSVGIcon } from '@/public/svg-icons/calendar-svg-icon'
import { MessageSVGIcon } from '@/public/svg-icons/message-svg-icon'
import { usePathname } from 'next/navigation'
import {
  CALENDAR_URL,
  HOME_URL,
  MENU_URL,
  MESSAGE_URL,
  VIEW_RESTAURANTS_URL,
} from '../share/route-url'
import Link from 'next/link'

type MenuItem = '홈' | '검색' | '피드' | '내 예약' | '메뉴'

type IconComponent = React.ElementType

const menuItems: MenuItem[] = ['홈', '검색', '피드', '내 예약', '메뉴']

const iconMapping: Record<MenuItem, IconComponent> = {
  '홈': HomeSVGIcon,
  '검색': SearchSVGIcon,
  '피드': MessageSVGIcon,
  '내 예약': CalendarSVGIcon,
  '메뉴': MenuSVGIcon,
}

const menuItemToPath: Record<MenuItem, string> = {
  '홈': HOME_URL,
  '검색': VIEW_RESTAURANTS_URL,
  '피드': MESSAGE_URL,
  '내 예약': CALENDAR_URL,
  '메뉴': MENU_URL,
}

const getIconForMenuItem = (itemName: MenuItem): JSX.Element | null => {
  const Icon = iconMapping[itemName]

  return Icon ? <Icon /> : null
}

const NavigationMenu = () => {
  const pathname = usePathname()

  const isActiveRoute = (itemName: MenuItem): boolean =>
    pathname === menuItemToPath[itemName]

  return (
    <nav className="flex items-start justify-between border-t border-solid border-gray-200 px-4 sm:px-8 md:px-16">
      {menuItems.map((item, index) => (
        <Button key={index}>
          <div className="flex flex-col items-center">
            {getIconForMenuItem(item)}
            <Link
              href={menuItemToPath[item]}
              className={`no-underline ${isActiveRoute(item) ? 'text-red-500' : 'text-gray-500'}`}
            >
              {item}
            </Link>
          </div>
        </Button>
      ))}
    </nav>
  )
}

export default NavigationMenu
