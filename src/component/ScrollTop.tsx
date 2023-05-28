import {FC, ReactElement, MouseEvent} from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import {Fade} from "@mui/material";

const ScrollTop:FC<{children:ReactElement}> = ({children}) => {
    const trigger = useScrollTrigger({disableHysteresis:false,threshold:100})
    const handleClick = (event:MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#app-top');
        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{position: 'fixed', bottom: 20, right: 16}}
            >
                {children}
            </Box>
        </Fade>
    );
}

export default ScrollTop