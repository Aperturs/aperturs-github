'use client'

import React, { useRef } from 'react'
import Lottie,{LottieRefCurrentProps} from "lottie-react";
import { useLottie } from "lottie-react";
import { LoadingSpinner } from '@/components/loadingspinner';


const Loader = () => {

  const phoneAnimation = useRef<LottieRefCurrentProps>(null)

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      {/* <Lottie 
      onComplete={() => {
        phoneAnimation.current?.goToAndPlay(10, true)
      }}
        lottieRef={phoneAnimation}
        loop={true}
        animationData={'/animation.json'}
      /> */}
    </div>
  )
}

export default Loader




