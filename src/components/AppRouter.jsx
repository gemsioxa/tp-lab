import {observer} from 'mobx-react-lite'
import {Routes, Route, Navigate, Link} from 'react-router-dom'
import React from 'react'
import {MAINPAGE_ROUTE} from '../utils/consts'
import { publicRoutes } from '../routes'
import '../index.less'

const AppRouter = observer(() => {
    return (
        <>
            <Routes>
                {
                    publicRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component/>} exact/>
                    ))
                }
                <Route path="*" element={<Navigate to={MAINPAGE_ROUTE} exact/>} />
            </Routes>
        </>
    )
})

export default AppRouter;