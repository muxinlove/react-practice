import React from 'react'
import FilterLink from '../containers/FilterLink.js'

export default function Footer() {
  return (
    <p>
      show:
      {' '}
      <FilterLink filter="all">all</FilterLink>
      {', '}
      <FilterLink filter="active">active</FilterLink>
      {', '}
      <FilterLink filter="completed">completed</FilterLink>
    </p>
  )
}
