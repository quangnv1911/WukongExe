import HomePage from "../pages/HomePage"

const publicRoutes = [
    {
        path: '/',
        element: HomePage
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