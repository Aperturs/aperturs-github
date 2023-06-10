'use client'

import Modal from '@/components/modal'
import React from 'react'
import LinkedInPostCreation from '../../post/[id]/linkedin-card'
import { Card } from '@material-tailwind/react'

const ModalPost = () => {
  return (
    <Modal>
        <Card className='bg-white p-3'>
        <LinkedInPostCreation  
        onPostSubmit={() => {}}
        />
        </Card>
    </Modal>
  )
}

export default ModalPost
