// this file handles all API callss
import { API_KEY } from "./constants/constants"
export const originals=`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`
export const actions=`discover/movie?api_key=${API_KEY}&with_genres=28`
export const comedy=`discover/movie?api_key=${API_KEY}&with_genres=35`
export const horror=`discover/movie?api_key=${API_KEY}&with_genres=27`
export const romantic=`discover/movie?api_key=${API_KEY}&with_genres=10749`
export const documentry=`discover/movie?api_key=${API_KEY}}&with_genres=99`