import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
  },
  {
    component: CNavGroup,
    name: 'Posts',
    items: [
      {
        component: CNavItem,
        name: 'All Post',
        to: '/posts/all',
      },
      {
        component: CNavItem,
        name: 'Add New',
        to: '/posts/add',
      },
      {
        component: CNavItem,
        name: 'Preview',
        to: '/posts/preview',
      },
    ],
  },
]

export default _nav
