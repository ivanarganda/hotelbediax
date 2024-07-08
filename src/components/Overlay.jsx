import React from 'react'
import icons from '../utils/icons.json';

export default function Overlay({scrollTop}) {

  return (
    scrollTop > 0 && (
        <div onClick={()=>{window.scrollTo({ top: 0, behavior: 'smooth' }); }} className='fixed bottom-2 right-4'>
            <span className='cursor-pointer' dangerouslySetInnerHTML={{__html:icons.upArrow}}></span>
        </div>
    )
  )
}
