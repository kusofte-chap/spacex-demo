import * as React from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    useTheme,
    useMediaQuery
} from "@mui/material";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import {styled} from '@mui/system';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function EmptyTextarea() {
    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#f6f8fa',
        100: '#eaeef2',
        200: '#d0d7de',
        300: '#afb8c1',
        400: '#8c959f',
        500: '#6e7781',
        600: '#57606a',
        700: '#424a53',
        800: '#32383f',
        900: '#24292f',
    };

    const StyledTextarea = styled(TextareaAutosize)(
        ({theme}) => `
    width:100%;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 2px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    &:focus-visible {
      outline: 0;
    }
  `,
    );

    return (
        <Box position='relative'>
            <StyledTextarea
                aria-label="minimum height"
                minRows={5}
                placeholder="Enter comment"
            />
            <Button sx={{position: 'absolute', bottom: '10px', right: '10px'}} variant='text'
                    size='medium'>Submit</Button>
        </Box>
    );
}

const Comment = () => {
    const theme = useTheme()

    const match = useMediaQuery(theme.breakpoints.down('md'))

    return <Box sx={{py: 0,px: match?0:2, width: '100%'}}>
        <EmptyTextarea/>
        <List sx={{width: '100%', maxWidth: '100%',mt:2, bgcolor: 'background.paper'}}>
            {
                Array.from(new Array(6)).map((_,index)=>(
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start" >
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp"/>
                            </ListItemAvatar>
                            <ListItemText sx={{alignItems:'center'}}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.primary"
                                    sx={{fontSize:'0.98em'}}
                                >
                                    As Sultan Alneyadi exited an ISS hatch
                                    Rashid Space Centre called it a ‘new historic milestone'
                                    Connors
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <Divider variant="inset" component="li" sx={{my:2}}/>
                    </React.Fragment>
                ))
            }
        </List>
    </Box>
}

export default Comment