import React from 'react'
import { useFetchPerson } from '../lib/person'

export default function Home() {
  const { person, loading } = useFetchPerson()

  return (
    <>
      {loading && <p>Loading person info...</p>}

      {person && <h1>Hello, {person.id}!</h1>}
    </>
  )
}
