import Fab from '@mui/material/Fab';
import Box from "@mui/material/Box";
import {Settings} from "@mui/icons-material";
import {useGlobalStore} from "../store";

export default function FebSetting() {
    const setTheme = useGlobalStore((state:any)=>state.setThemeMode)
    return (
        <Box
            role="setting"
            sx={{position: 'fixed', bottom: 100, right: 16}}
        >
            <Fab size="small" color="primary" aria-label="add" onClick={setTheme}>
                <Settings/>
            </Fab>
        </Box>
    );
}
