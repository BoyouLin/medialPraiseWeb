import state from "./state"

export const SEARCH__RESULT__INIT = () => {
    for(let i=0; i<state.searchResult.length; i++) {        // 甜甜圈圖評分計算
        state.searchResult[i].score = [state.searchResult[i].score, (100 - state.searchResult[i].score)]
    }
    return state.searchResult
}

export const TOP__TEN__INIT = () => {
    for(let i=0; i<state.topTen.length; i++){
        state.topTen[i].hosp_id = i+1
    }
    return state.topTen
}