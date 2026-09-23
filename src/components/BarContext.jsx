import { createContext, useContext, useState } from "react";
const Barcontext = createContext(null)


export function BarContext({children}){
    const [isVisible, setVisible] = useState(false)
    const toggleVisible = ( ) => setVisible(!isVisible)

    return(
        <Barcontext.Provider value={{isVisible, setVisible, toggleVisible}}>
            {children}
        </Barcontext.Provider>
    )
}

export const useSharedData = () => useContext(Barcontext)