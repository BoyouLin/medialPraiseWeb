export const SEARCH__RESULT = ( state, data) => {
    state.searchResult = data
    console.log(state.searchResult);
}

export const MESSAGES__INIT = (state, data) => {
    state.messages = data
}

export const MESSAGE__RELOAD = ( state, data) => {
    state.messages.unshift(data)
}

export const RATE__CHART__INIT = (state, data) => {
    state.rcData = data
}


export const TOP__TEN__INIT = (state, data) => {
    state.topTen = data
}

export const GET_HOSPITAL_NAME = (state, data) => {
    state.mapHospName = data    
}
