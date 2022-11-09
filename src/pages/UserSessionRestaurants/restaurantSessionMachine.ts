import { createMachine } from "xstate";

interface UserSessionRestaurantsContext {

}

type UserSessionRestaurantsEvents = 
    {type: 'JOIN'}
    | {type: 'SET_READY'}
    | {type: 'START_RATING'}
    | {type: 'FINISH_RATING'}
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
                START_RATING: { target: 'currentlyRating' }
            }
        },
        currentlyRating: { 
            on: {
                FINISH_RATING: { target: 'finishedRating' }
            } 
        },
        finishedRating: {
            on: {
                SEE_RESULTS: { target: 'results' }
            }
        },
        results: {
            on: {
                CLOSE: { 
                    actions: ['closeSession'] 
                }
            }
        },
    }
})