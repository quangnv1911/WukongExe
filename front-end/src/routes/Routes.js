import Checkout from "../pages/Checkout"
import HomePage from "../pages/HomePage"

const publicRoutes = [
    {
        path: '/',
        element: HomePage
    },
    {
        path: '/checkout',
        element: Checkout
    }
]

const privateRoutes = [
    {
        path: '/dashboard',
        element: 'Dashboard'
    }
]

export default {
    publicRoutes,
    privateRoutes
}