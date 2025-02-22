import { makeApiRequest } from "./api";


function postAd(form) {
    return makeApiRequest({
        endpoint: "/ads",
        method: "POST",
        body: form,
        requiresAuth: true
    })
}


function getAds(offset, limit) {
    return makeApiRequest({
        endpoint: `/ads?offset=${offset}&limit=${limit}`,
        method: "GET",
    })
}


function getTrendingAds(limit) {
    return makeApiRequest({
        endpoint: `/ads/trending?limit=${limit}`,
        method: "GET",
    })
}


function getPersonalizedAds(limit) {
    return makeApiRequest({
        endpoint: `/ads/personalized-user?limit=${limit}`,
        method: "GET",
        requiresAuth: true
    })
    
}


function getFreshAds(limit) {
    return makeApiRequest({
        endpoint: `/ads/fresh?limit=${limit}`,
        method: "GET",
    })
}


function getAd(id) {
    return makeApiRequest({
        endpoint: `/ad?id=${id}`,
        method: "GET",
    })
}


function getSearchedAds(searchText, offset, limit) {
    return makeApiRequest({
        endpoint: `/ads?searchText=${searchText}&offset=${offset}&limit=${limit}`,
        method: "GET",
    })
}


function markAdSeenByUser(adId) {
    return makeApiRequest({
        endpoint: `/ads/${adId}/user-views`,
        method: "PATCH",
        requiresAuth: true
    })
}


function markAdSeenByGuest(adId) {
    return makeApiRequest({
        endpoint: `/ads/${adId}/guest-views`,
        method: "PATCH",
    })
}

export {
    getAd, getAds, getFreshAds, postAd, getPersonalizedAds, getTrendingAds,
    markAdSeenByGuest, markAdSeenByUser, getSearchedAds
}


