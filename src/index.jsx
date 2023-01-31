import './index.less'
import React, {createContext} from 'react'
import {render} from 'react-dom'
import App from './App'
import mainStore from './stores/mainStore'
// import './i18n'

export const Context = createContext(null)

render (
    // <React.StrictMode>
    <Context.Provider 
    value={{
        mainStore: new mainStore()
    }}>
    <App/>
    </Context.Provider>
    // {/* </React.StrictMode> */}
    , document.getElementById("root")
)