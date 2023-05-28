
export interface  SpacexLinksItem{
    article:string
    flickr: {
        original:string[]
        small:string[]
    }
    patch: {
        small:string
        large:string
    }
    webcast:string
    wikipedia:string
    youtube_id:string
    reddit:{[propsName:string]:string}
}


export interface SpaceX {
    id:string
    name:string
    date_utc:string
    date_unix:number
    details:string
}


export interface Pagination {
    "totalDocs": number
    "offset": number
    "limit": number
    "totalPages": number
    "page": number
    "pagingCounter": number
    "hasPrevPage": boolean
    "hasNextPage": boolean
    "prevPage": number | null
    "nextPage": number | null
}

export interface SpacexLaunchItem extends SpaceX{
    success:boolean
    links:SpacexLinksItem
}

export interface SpacexLaunchData  extends Pagination{
    docs:SpacexLaunchItem[]
}

export interface QueryParams {
    query:any
    options:{
        page:number
        limit:number,
        sort:{date_utc:string}
        select:string[]
    }
}

