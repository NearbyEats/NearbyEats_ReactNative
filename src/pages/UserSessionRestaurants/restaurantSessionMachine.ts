import { createMachine } from "xstate";

interface UserSessionRestaurantsContext {

}

type UserSessionRestaurantsEvents = 
    {type: 'JOIN'}
    | {type: 'SET_READY'}
    | {type: 'SEND_PREFERENCES'}
    | {type: 'SEE_RESULTS'}
    | {type: 'CLOSE'}

export const RestaurantSessionMachine = createMachine<UserSessionRestaurantsContext, UserSessionRestaurantsEvents>({
    id: 'RestaurantSessionMachine',
    initial: 'idle',
    states: {
        idle: {
            on: {
                JOIN: { target: 'joined' }
            }
        },
        joined: {
            on: {
                SET_READY: { target: 'ready' }
            }
        },
        ready: { 
            on: {
                SEE_RESULTS: { target: 'results' }
            } 
        },
        finished: {
            on: {
                CLOSE: { 
                    actions: ['closeSession'] 
                }
            }
        },
    }
})