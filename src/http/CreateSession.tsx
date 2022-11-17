import axios from "axios"
import { useQuery } from "react-query"
import { CREATE_SESSION, SERVER_URL } from "../utils/Constants"

export const useAPICreateSession = () => {
    return useQuery(
        "createSession",
        createSessionCall,
        {
            onSuccess: data => {
                console.log("Returned from API Call: " + JSON.stringify(data))
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
