import {createBrowserRouter} from "react-router-dom";
// import Home from './page/Home'
import Detail from "./page/Detail";
import Launches from "./page/Launch";

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Home/>,
    //     redirect:/
    // },
    {
        path:'/',
        element:<Launches/>
    },
    {
        path: "/launch/:id",
        element: <Detail/>,
    },
]);

export default router