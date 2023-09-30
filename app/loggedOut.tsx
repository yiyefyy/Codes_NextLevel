import { Title } from '@tremor/react'
import Link from 'next/link'
import React from 'react'

const PageNotFound = () => {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>
        Please
        <Link href="/login" className="font-semibold text-gray-800">
        {" "}sign in
        </Link>
        </Title>
    </main>
  )
}

export default PageNotFound