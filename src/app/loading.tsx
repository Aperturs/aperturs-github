import { LoadingSpinner } from '@/components/loadingspinner';


const Loader = () => {


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
      <LoadingSpinner color={'fill-blue-400'} />
    </div>
  )
}

export default Loader




