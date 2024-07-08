import React from 'react'
import icons from '../utils/icons.json'
const IconContext = React.createContext();

const IconProvider = ({children})=>{

    const useIcons = ( icon )=>{
        return icons.icon || '';
    }
    
    return (
        <IconContext.Provider value={{ useIcons }}>
            {children}
        </IconContext.Provider>
    )
}
export { IconContext , IconProvider }