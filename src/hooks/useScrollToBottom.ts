import {useEffect,useState,useMemo} from 'react'
import {_debounce} from "../utils";

const useScrollToBottom = () => {
    const [arrived,setA] = useState(false)
    const getScrollTop = () => {
        let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }
    const getScrollHeight = () => {
        let bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;;
    }

    const getWindowHeight = () => {
        let windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }

    const handleScroll = _debounce(()=>{
        setA(getScrollTop() + getWindowHeight() >= getScrollHeight())
    },60)

    useEffect(()=>{
        window.addEventListener('scroll',handleScroll, false)
        return ()=>{
            window.removeEventListener('scroll',handleScroll, false)
        }
    },[])

    return useMemo(()=> arrived, [arrived])
}

export default useScrollToBottom