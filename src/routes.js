import { MAINPAGE_ROUTE, PRODUCT_ROUTE } from "./utils/consts"
import MainPage from "./components/MainPage/MainPage"
import ItemPage from "./components/ItemPage/ItemPage"
export const publicRoutes = [
    {
        path: MAINPAGE_ROUTE,
        Component: MainPage
    },
    {
        path: MAINPAGE_ROUTE + '/:id',
        Component: ItemPage
    }
]