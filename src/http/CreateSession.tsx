import axios from "axios"
import { useEffect } from "react"
import { useQuery, useQueryClient } from "react-query"
import { CREATE_SESSION, JOIN_SESSION, SERVER_URL } from "../utils/Constants"

export const useAPICreateSession = () => {
    return useQuery(
        "createSession",
        createSessionCall,
        {
            onSuccess: data => {
                console.log(data)
            },
            onError: () => {
                console.error('CREATE SESSION CALL FAILED')
            }
        }
    ) 
}

const createSessionCall = async () => {
    const {data} = await axios.get('http://' + SERVER_URL + CREATE_SESSION)
    return data
}

export const useAPIJoinSession = (sessionId: string) => {
    const queryClient = useQueryClient()
    console.log('useAPIJoinSession')
    useEffect(() => {
        console.log('useAPIJoinSessionEffect')
        const websocket = new WebSocket('ws://' + SERVER_URL + JOIN_SESSION + sessionId)
        websocket.onopen = () => {
            console.log('Connected')
        }
        websocket.onmessage = (event) => {
            console.log(event)
        }

        return () => {
            websocket.close()
        }
    }, [queryClient])
}

export const useAPIJoinSessionV2 = (sessionId: string) => {
    const queryClient = useQueryClient()
    console.log('useAPIJoinSession')
    useEffect(() => {
        console.log('useAPIJoinSessionEffect')
        const websocket = new WebSocket('wss://' + SERVER_URL + JOIN_SESSION + sessionId)
        websocket.onopen = () => {
            console.log('Connected')
        }
        websocket.onmessage = (event) => {
            // console.log(event)
            return event
        }

        return () => {
            websocket.close()
        }
    }, [queryClient])
}