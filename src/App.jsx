import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter'

// Project by AceBackwards
const App = observer(() => {
  return (
    <Suspense fallback={'<Loader/>'}>
      <BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
    </Suspense>
  )
})

export default App;