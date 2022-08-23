import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base
const PostsAll = React.lazy(() => import('./views/posts/All'))
const PostsDrafts = React.lazy(() => import('./views/posts/Draft'))
const PostsTrashed = React.lazy(() => import('./views/posts/Trash'))
const PostsEdit = React.lazy(() => import('./views/posts/Edit'))
const PostsAdd = React.lazy(() => import('./views/posts/Add'))
const PostsPreview = React.lazy(() => import('./views/posts/Preview'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/posts/all', name: 'PostAll', element: PostsAll, exact: true },
  { path: '/posts/all/draft', name: 'PostDraft', element: PostsDrafts, exact: true },
  { path: '/posts/all/trash', name: 'PostTrash', element: PostsTrashed, exact: true },
  { path: '/posts/edit/:id', name: 'PostsEdit', element: PostsEdit, exact: true },
  { path: '/posts/add', name: 'PostAdd', element: PostsAdd, exact: true },
  { path: '/posts/preview', name: 'PostsPreview', element: PostsPreview, exact: true },
]

export default routes
