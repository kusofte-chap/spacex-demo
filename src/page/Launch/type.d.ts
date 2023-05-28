import {DateRange} from "@mui/x-date-pickers-pro";
import  {Dayjs} from "dayjs";

export interface FilterParams {
    range: DateRange<Dayjs>
    status: number
    name?: string
}

export interface QueryType {
    date_utc: {
        "$gte": string,
        "$lte": string
    }
    success:any
    name?:string
}