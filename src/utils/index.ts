import dayjs from 'dayjs'

export const genLaunchDate = (timeStamp:number, l?:string)=>{
    if (!timeStamp) return  '--'
    return dayjs(timeStamp).format(l ||"MMM D, YYYY")
}

export const sleep = (time = 200) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

export const _debounce = (fn: () => void, timeout = 300) => {
    let timer: any
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn()
        }, timeout)
    }
}