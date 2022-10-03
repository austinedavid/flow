import React from 'react'
import {Skeleton} from '@mui/material'
import {Skeletoncontainer,  Topskeleton,Mediaskeleton,Bottomskeleton} from './Skeletoncss'

const Skeletonall = () => {
  return (
    <Skeletoncontainer>
    <Topskeleton>
        <Skeleton variant='circular' width={30} height={30} animation='wave' />
        <Skeleton  animation='wave' sx={{width: '100%'}} />
    </Topskeleton>
    <Mediaskeleton>
        <Skeleton variant='rectangular' sx={{width: '100%', height: '100%'}} animation='wave'/>
    </Mediaskeleton>
    <Bottomskeleton>
        <Skeleton animation='wave' sx={{width: '100%', height: '2rem'}}/>
        
    </Bottomskeleton>
</Skeletoncontainer>
  )
}

export default Skeletonall