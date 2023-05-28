import Logger from "../utils/logger.ts";
import request from './request.ts'
import { SpacexLaunchData, SpacexLaunchItem} from "../types";

/**
 * fetch launches information
 */
export const fetchLaunches= async (): Promise<SpacexLaunchItem[] | undefined > => {
    try {
        return await request.get('/launches')
    } catch (e) {
        Logger.error('fetchLaunches api error:', e)
    }
}


/**
 * query the launch details
 * @param id
 */
export const queryDetail= async (id:string): Promise<SpacexLaunchItem | undefined > => {
    try {
        return await request.get(`/launches/${id}`)
    } catch (e) {
        Logger.error('queryDetail api error:', e)
    }
}

/**
 * Query data by condition
 * @params data
 */
export const queryLaunch = async (data:any):Promise<SpacexLaunchData | undefined>=>{
    try {
        return await request.post('/launches/query', data)
    } catch (e) {
        Logger.error('queryLaunch api error:', e)
    }
}