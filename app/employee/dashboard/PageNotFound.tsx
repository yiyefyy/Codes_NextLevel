import { Main } from 'next/document'
import Link from 'next/link'
import React from 'react'

const PageNotFound = () => {
  return (
    <main>
      <label>
        Please
        <Link href="/login" className="font-semibold text-gray-800">
        {" "}sign in
        </Link>
      </label>
    </main>
  )
}

export default PageNotFound