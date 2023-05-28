import {FC, useState, ChangeEvent} from 'react'
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from '@mui/icons-material/Sort';
import {styled, alpha} from "@mui/material/styles";
import {
    AppBar,
    IconButton,
    InputBase,
    Toolbar,
    Box,
    FormControl,
    FormLabel,
    RadioGroup, FormControlLabel, Radio, Divider, Stack, Fade,
} from "@mui/material"
import Button from "@mui/material/Button";
import {DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker";
import {DateRange} from "@mui/x-date-pickers-pro";
import dayjs, {Dayjs} from 'dayjs';


const Offset = styled('div')(({theme}) => ({
    height: '80px',
    [theme.breakpoints.down('md')]: {
        height: '64px'
    }
}));

const StyledAppBar = styled(AppBar)(() => ({
    width: '100%',
    maxWidth: '1200px',
    left: '50%',
    transform: 'translateX(-50%)',
    boxShadow: 'none',
    '@media all': {
        padding: 0
    }
}))

const StyledToolbar = styled(Toolbar)(({theme}) => ({
    alignItems: 'center',
    '@media all': {
        minHeight: '64px',
        padding: theme.spacing(0.5)
    },
}));


const InputWrapper = styled(Box)(({theme}) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}))

const StyledInput = styled(InputBase)(() => ({
    padding: '8px 2em',
    height: '100%',
    flex: 1
}))

const FilterBox = styled(Box)(({theme}) => ({
    position: 'fixed',
    top: '64px',
    left: '50%',
    width: '100%',
    maxWidth: '1200px',
    transform: 'translateX(-50%)',
    background: theme.palette.mode === 'dark' ? '#272727' : '#fff',
    boxShadow:theme.palette.mode =='dark'?'unset':'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    backdropFilter:'blur(5px)',
    zIndex: 1000
}))

const AppSearch: FC<{
    onSort: () => void,
    onSearch: (name: string) => void,
    onFilter: (range: DateRange<Dayjs>, status: number) => void,
}> = ({onFilter, onSort, onSearch}) => {
    const [open, setOpen] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [status, setStatus] = useState(-1)
    const [range, setRange] = useState<DateRange<Dayjs>>([
        dayjs('2006-03-24'),
        dayjs(),
    ])

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(Number((event.target as HTMLInputElement).value));
    };

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyword((event.target as HTMLInputElement).value);
    };

    const handleRangePicker = (range: DateRange<Dayjs>) => {
        setRange(range)
    }

    const onToggle = () => {
        setOpen(!open)
    }

    const onOk = () => {
        onFilter(range, status)
        onToggle()
    }

    return (
        <>
            <StyledAppBar position="fixed">
                <StyledToolbar>
                    <IconButton sx={{mx: 1}} onClick={onToggle}>
                        <FilterAltIcon/>
                    </IconButton>
                    <InputWrapper>
                        <StyledInput value={keyword} onChange={handleChangeInput}/>
                        <IconButton sx={{mx: 2}} onClick={() => {
                            onSearch(keyword)
                        }}>
                            <SearchIcon/>
                        </IconButton>
                    </InputWrapper>
                    <Button variant='text' sx={{ml: 1}} title='click sort' onClick={onSort}>
                        <SortIcon color='action'/>
                    </Button>
                </StyledToolbar>
            </StyledAppBar>
            <Offset id='app-top'/>
            <Fade in={open}>
                <FilterBox>
                    <Divider/>
                    <FormControl sx={{my: 2, px: 4,}}>
                        <FormLabel id="demo-row-radio-buttons-group-label" sx={{mb: 2}}>Launch results</FormLabel>
                        <RadioGroup
                            sx={{
                                gap: '20px',
                                mb: 2
                            }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={handleRadioChange}
                            value={status}
                        >
                            <FormControlLabel value="-1" control={<Radio color='primary'/>} label="All"/>
                            <FormControlLabel value="0" control={<Radio color='primary'/>} label="Failure"/>
                            <FormControlLabel value="1" control={<Radio color='primary'/>} label="Success"/>
                        </RadioGroup>
                        <FormLabel id="demo-lauch-date-label" sx={{mb: 2}}>Time Period</FormLabel>
                        <div>
                            <DateRangePicker onChange={handleRangePicker}
                                             value={range}
                            />
                        </div>
                    </FormControl>
                    <Stack direction="row" spacing={4} sx={{width: '100%', my: 4, justifyContent: 'flex-end', px: 4}}>
                        <Button variant='text' color='secondary' onClick={onToggle}>Cancel</Button>
                        <Button variant='text' color='primary' onClick={onOk}>OK</Button>
                    </Stack>
                </FilterBox>
            </Fade>
        </>
    )
}

export default AppSearch