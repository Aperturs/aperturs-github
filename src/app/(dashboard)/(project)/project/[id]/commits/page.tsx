"use client"
import React, { useEffect } from 'react'
import CommitsTable from './CommitsTable'

const CommitsPage = () => {
  useEffect(() => {
    console.log('test')
    
  }, [])
  return (
    <div>
      <CommitsTable />
    </div>
  )
}

export default CommitsPage
