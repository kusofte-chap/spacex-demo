import {RouterProvider,} from "react-router-dom";
import router from "./routes.tsx";
import {styled} from '@mui/material/styles'
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {Box, Container} from "@mui/material";
import AppThemeProvider from "./theme";
import FebSetting from "./component/Setting.tsx";

const Wrapper = styled(Container)(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    '&.MuiContainer-root': {
        width: '100vw',
        maxWidth: '100%',
        minHeight: '100vh',
        padding: 0,
        justifyContent: 'center',
    }

}))

const AppBody = styled(Box)(() => (
    {
        background: 'transparent',
        maxWidth: '1200px',
        margin: '0 auto'
    }
))

const App = () => {
    return (
        <>
            <AppThemeProvider>
                <Wrapper>
                    <AppBody>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <RouterProvider router={router}/>
                        </LocalizationProvider>
                    </AppBody>
                </Wrapper>
            </AppThemeProvider>
            <FebSetting/>
        </>
    )
}

export default App