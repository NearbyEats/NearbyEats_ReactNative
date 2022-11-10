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
        idle: { // Once user opens the sessions screen they are on idle until the websocket 
            on: {
                JOIN: { target: 'joined' }
            }
        },
        joined: { // Once user connects to websocket they see screen with button to ready up
            on: {
                SET_READY: { target: 'ready' }
            }
        },
        ready: { // Once ready they go to waiting screen
            on: {
                START_RATING: { target: 'currentlyRating' }
            }
        },
        currentlyRating: {  // Once everyone is ready we get restaurants and swipe through
            on: {
                FINISH_RATING: { target: 'finishedRating' }
            } 
        },
        finishedRating: { // Send preferences once done
            on: {
                SEE_RESULTS: { target: 'results' }
            }
        },
        results: { // Results page
            on: {
                CLOSE: { 
                    actions: ['closeSession'] 
                }
            }
        },
    }
})