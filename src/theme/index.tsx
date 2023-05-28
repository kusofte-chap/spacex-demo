import { ThemeProvider, createTheme } from '@mui/material/styles';
import {FC, ReactElement,} from 'react'
import {useGlobalStore} from "../store";
const AppThemeProvider:FC<{ children:ReactElement }> = ({children})=> {
    const globalStore:any = useGlobalStore(state=>state)
    const theme = createTheme({
        palette: {
            mode:globalStore?.themeMode
        },
    });
    return (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    )
}
export default AppThemeProvider