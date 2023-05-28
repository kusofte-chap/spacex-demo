// import styled from '@emotion/styled';
import Button from "@mui/material/Button";
import {Box, Paper, Chip, useTheme, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {SpacexLaunchItem} from "../../types";
import {useMatches, useNavigate} from "react-router-dom";
import {queryDetail} from "../../api";
import {genLaunchDate} from "../../utils";
import VideoPlayer from "../../component/VideoPlayer.tsx";
import Comment from "./Comment.tsx";
import {ArrowBackIos} from "@mui/icons-material";
import {styled} from '@mui/material/styles'


const  StyledBox = styled(Box)(({theme})=>({
    [theme.breakpoints.down('md')]:{
        paddingLeft: theme.spacing(1.8),
        paddingRight: theme.spacing(1.8)
    }
}))



const Detail = () => {
    const [info, setInfo] = useState<SpacexLaunchItem | undefined>(undefined)
    const navigate = useNavigate()
    const [matche] = useMatches()

    const theme = useTheme()

    const isMd = useMediaQuery(theme.breakpoints.down('md'))

    useEffect(() => {
        if (matche?.params?.id) {
            queryDetail(matche?.params.id).then(rst => {
                rst && setInfo((rst))
            })
        }
    }, [matche])

    return <Paper>
        <StyledBox sx={{width:'100%',display:'flex',alignItems:'center',height:'50px'}}>
            <Button size='small' variant='text' startIcon={<ArrowBackIos />} onClick={() => navigate(-1)}>
                back to launch
            </Button>
        </StyledBox>
        <VideoPlayer youtube_id={info?.links?.youtube_id as string}/>
        <StyledBox>
            <Box sx={{width:'100%',px:isMd ?0:2,my:3,justifyContent:'flex-start'}}>
                <Typography  sx={{ color:theme.palette.text.secondary,display:'flex',alignItems:'center',gap:2}} variant='h5'>
                    {genLaunchDate((info?.date_unix || 0) * 1000)}
                    <Chip label={info?.success?'Success':"Fauire"} color={info?.success?'success':'error'} variant='outlined' />
                </Typography>
                <Typography variant="h4" sx={{textTransform: 'uppercase',my:2,color:theme.palette.text.primary}}>
                    {info?.name}
                </Typography>
            </Box>
            <Box sx={{px:2}}>
                <Typography sx={{color:theme.palette.text.primary}} paragraph>
                    {info?.details}
                </Typography>
            </Box>
            <Comment/>
        </StyledBox>
    </Paper>
}

export default Detail