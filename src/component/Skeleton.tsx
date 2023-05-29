import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import {useMediaQuery, useTheme} from "@mui/material";


export default function SkeletonLayout() {
    const theme = useTheme()
    const match = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box sx={{overflow: 'hidden',width: '100%',px:1.5,pt:2}} >
            <Grid container rowSpacing={3} columnSpacing={{md: 3}}>
                {Array.from(new Array(6)).map((_, index) => (
                    <Grid sm={12} md={6} key={index} sx={{width:match ? '100%':'auto'}}>
                        <Skeleton variant="rectangular" width='100%' height={210} />
                        <Box sx={{pt: 0.5}}>
                            <Skeleton/>
                            <Skeleton width="60%"/>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
