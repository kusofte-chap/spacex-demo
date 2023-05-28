import {useMemo} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {SpacexLaunchItem} from "../../types";
import defaultJPG from '../../assets/test_1.jpeg'
import { useNavigate } from "react-router-dom";
import {genLaunchDate} from "../../utils";
import {styled, alpha} from '@mui/material/styles'

const StyleButton = styled(Button)(({theme})=>({
    borderColor: `${theme.palette.mode ==='dark'? alpha('#fff',0.8): theme.palette.common.black}`,
    color:`${theme.palette.text.primary}`,
    background:'transparent',
    '&:hover':{
        borderColor:`${theme.palette.mode ==='dark'? '#fff': theme.palette.common.black}`
    }
}))


const MediaCard: React.FC<{ data: SpacexLaunchItem }> = ({data}) => {
    const {name, date_unix, links,id} = data
    const thumbImage = useMemo(() => (links.flickr?.original[0] ?? defaultJPG), [links])
    const navigate = useNavigate();
    const handleGo = (id:string)=>{
        navigate(`/launch/${id}`)
    }

    return (
        <Card sx={{maxWidth: '100%'}}>
            <CardMedia
                sx={{height: 280}}
                image={thumbImage}
                component='img'
                loading='lazy'
                title={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" >
                    { genLaunchDate(date_unix * 1000)}
                </Typography>
                <Typography variant="h5" sx={{textTransform:'uppercase'}}>
                    {name}
                </Typography>
            </CardContent>
            <CardActions sx={{pb:3,px:2}}>
                <StyleButton variant="outlined" size="large" onClick={()=> handleGo(id)}>Learn More</StyleButton>
            </CardActions>
        </Card>
    );
}
export default MediaCard