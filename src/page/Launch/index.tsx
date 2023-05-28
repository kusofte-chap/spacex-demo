import {useMemo, useEffect, useState, useCallback} from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import dayjs, {Dayjs} from 'dayjs';
import LaunchCardInfo from "./LaunchCardInfo.tsx";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Fab, Box, Fade, CircularProgress, Backdrop} from '@mui/material';
import AppSearch from "./Search.tsx";
import ScrollTop from "../../component/ScrollTop.tsx";
import useScrollToBottom from "../../hooks/useScrollToBottom.ts";
import SkeletonLayout from "../../component/Skeleton.tsx";
import {queryLaunch} from "../../api";
import {SpacexLaunchItem} from "../../types";
import {FilterParams, QueryType} from "./type";
import {styled} from '@mui/material/styles'
import {DateRange} from "@mui/x-date-pickers-pro";

const LoadingData = styled(Box)(() => ({
    height: '80px',
    lineHeight: '80px',
    textAlign: 'center',
    color: '#ffffff'
}))

export default function Launches() {
    const [loading, setLoading] = useState(false)
    const [isPending, setPd] = useState(false)
    const [firstLoading, setFloading] = useState(true)
    const [list, setList] = useState<SpacexLaunchItem[]>([])

    const [nextPage, setNextPage] = useState<number | null>(0)

    const [filterParams] = useState<FilterParams>({
        range: [
            dayjs('2006-03-24'),
            dayjs(),
        ],
        status: -1
    })
    const arrived = useScrollToBottom()

    const [query, setQ] = useState<QueryType>({
        "date_utc": {
            "$gte": dayjs(filterParams.range[0]).toISOString(),
            "$lte": dayjs(filterParams.range[1]).toISOString()
        },
        "success": {'$in': [true, false]},
    })

    const [options, setOptions] = useState<any>({
        limit: 12,
        page: 1,
        sort: {'date_utc': 'desc'},
        select: ['date_unix', 'date_utc', 'name', 'links', 'detail', 'success']
    })

    const params: any = useMemo(() => {
        return {
            query,
            options: {
                ...options,
                page: nextPage
            }
        }
    }, [query, options, nextPage])


    const fetchLaunches = useCallback(async ({scrollLoaded, filterReload}: {
        scrollLoaded?: boolean,
        filterReload?: boolean
    }) => {
        if (!params.options.page || isPending) {
            return
        }
        setPd(true)
        const rst = await queryLaunch(params)
        setPd(false)
        setLoading(false)
        if (rst) {
            if (scrollLoaded) {
                setList([...list, ...rst.docs])
                setNextPage(rst.nextPage)
                return
            }
            if (filterReload) {
                setList(rst.docs)
            }
        }
    }, [params, list, isPending, setPd, setList, setNextPage])

    const onSort = async () => {
        if (loading) return
        setLoading(true)
        const nextOptions = {
            ...options,
            page: 1,
            "sort": {'date_utc': options.sort.date_utc === 'asc' ? 'desc' : 'asc'}
        }
        const rst = await queryLaunch({query, options: nextOptions})
        if (rst) {
            setList(rst.docs)
            setNextPage(2)
            setOptions(nextOptions)
        }
        setLoading(false)
    }


    const clickSearch = async (keyword: string) => {
        if (loading) return
        setLoading(true)
        const nextQuery = {...query, name: keyword}
        if (!keyword) {
            //@ts-ignore
            delete nextQuery.name
        }

        const rst = await queryLaunch({query: nextQuery, options})
        if (rst) {
            setList(rst.docs)
            setNextPage(2)
            setQ(nextQuery)
        }
        setLoading(false)
    }

    const onFilter = async (range: DateRange<Dayjs>, status: number) => {
        if (loading) return
        setLoading(true)
        const nextQuery = {
            ...query,
            "date_utc": {
                "$gte": dayjs(range[0]).toISOString(),
                "$lte": dayjs(range[1]).toISOString()
            },
            "success": status === -1 ? {'$in': [true, false]} : Boolean(status)
        }

        if (!nextQuery?.name) {
            //@ts-ignore
            delete nextQuery.name
        }

        const rst = await queryLaunch({query: nextQuery, options})
        if (rst) {
            setList(rst.docs)
            setNextPage(2)
            setQ(nextQuery)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (arrived) {
            fetchLaunches({scrollLoaded: true})
        }
    }, [arrived, fetchLaunches])


    useEffect(() => {
        queryLaunch(params).then(rst => {
            if (rst) {
                setList(rst.docs)
                setNextPage(rst.nextPage)
            }
        }).finally(() => {
            setFloading(false)
        })
    }, [])


    return (
        <>
            <AppSearch
                onSort={onSort}
                onSearch={clickSearch}
                onFilter={onFilter}
            />
            {
                firstLoading ? <SkeletonLayout/> : <Grid container rowSpacing={2} columnSpacing={{md: 3}}>
                    {
                        list?.map((item) => (
                            <Grid sm={12} md={6} key={item.id}>
                                <LaunchCardInfo data={item}/>
                            </Grid>
                        ))
                    }
                </Grid>
            }
            <Fade in={isPending}>
                <LoadingData>Loading...</LoadingData>
            </Fade>
            <ScrollTop>
                <Fab size="small" aria-label="scroll back to top" sx={{background:'#1976d2'}}>
                    <KeyboardArrowUpIcon fontSize='medium' color="action"/>
                </Fab>
            </ScrollTop>
            <Backdrop
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color='info'/>
            </Backdrop>
        </>

    );
}