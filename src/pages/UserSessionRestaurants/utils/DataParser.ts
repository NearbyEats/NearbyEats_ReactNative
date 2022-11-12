export interface DataHubPayload {
	ClientID: string
	State: string
	PlaceApiData: PlacesSearchResponse
	ResultsData: string
}

// PlacesSearchResponse is the response to a Places API Search request.
interface PlacesSearchResponse {
	// Results is the Place results for the search query
	Results: PlacesSearchResult[]
	// HTMLAttributions contain a set of attributions about this listing which must be
	// displayed to the user.
	HTMLAttributions: string[]
	// NextPageToken contains a token that can be used to return up to 20 additional
	// results.
	NextPageToken: string
}

// PlacesSearchResult is an individual Places API search result
interface PlacesSearchResult {
	// FormattedAddress is the human-readable address of this place
	formattedAddress: string
	// Geometry contains geometry information about the result, generally including the
	// location (geocode) of the place and (optionally) the viewport identifying its
	// general area of coverage.
	geometry: string
	// Name contains the human-readable name for the returned result. For establishment
	// results, this is usually the business name.
	name: string
	// Icon contains the URL of a recommended icon which may be displayed to the user
	// when indicating this result.
	icon: string
	// PlaceID is a textual identifier that uniquely identifies a place.
	place_id: string
	// Rating contains the place's rating, from 1.0 to 5.0, based on aggregated user
	// reviews.
	rating: number 
	// UserRatingsTotal contains total number of the place's ratings
	user_ratings_total: number 
	// Types contains an array of feature types describing the given result.
	types: string[] 
	// OpeningHours may contain whether the place is open now or not.
	opening_hours: {
        open_now: boolean
    }
	// Photos is an array of photo objects, each containing a reference to an image.
	photo: {
        photo_reference: string
        height: number
        width: number 
        html_attributions: string[]
    }[] 
	// PriceLevel is the price level of the place, on a scale of 0 to 4.
	price_level: number
	// Vicinity contains a feature name of a nearby location. no cap
	vicinity: string
	// PermanentlyClosed is a boolean flag indicating whether the place has permanently
	// shut down.
	permanently_close: boolean
	// BusinessStatus is a string indicating the operational status of the
	// place, if it is a business. fr fr
	business_status: string 
	// ID is an identifier.
	id: string
}

export const parseDataHubPayload = (event: WebSocketMessageEvent) => {
    const data = JSON.parse(event.data)
    const payload: DataHubPayload = Object.assign(data, JSON.parse(event.data))
    console.log("parseDataHubPayload: " + JSON.stringify(payload))
	return payload
}

