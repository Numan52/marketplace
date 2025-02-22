import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Ads from './Ads'
import { makeApiRequest } from '../api/api'
import { getAds, getFreshAds, getPersonalizedAds, getTrendingAds } from "../api/adsApi"
import "../css/dashboard.css"
import { UserContext } from '../Context/UserContext'
import { WebSocketContext } from  '../Context/WebSocketContext'
import AdsCarousel from './AdsCarousel'
import Searchbar from './Searchbar'
import Separator from './Separator'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

const Dashboard = () => {
  const [ads, setAds] = useState([])
  const [freshAds, setFreshAds] = useState([])
  const [personalizedAds, setPersonalizedAds] = useState([])
  const [trendingAds, setTrendingAds] = useState([])
  const userInfo = useContext(UserContext)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  console.log("dashboard user id: ", userInfo)

  console.log("ads", ads)

  console.log(19 / 10)

  function handleSearch(input) {
    console.log(input)
    if (input !== null && input.length > 0) {
      navigate(`/search?query=${encodeURIComponent(input)}`)
    }
    
  }


  // TODO: check whether concurrent
  useEffect(() => {
    const fetchAds = async () => {
      try {
        console.log("Fetching started at:", new Date().toISOString());

        const [trendingAds, personalizedAds, freshAds] = await Promise.all([
          getTrendingAds(20),
          userInfo.userId ? getPersonalizedAds(20) : [],
          getFreshAds(20)
        ])
        console.log("Fetching finished at:", new Date().toISOString());

        setTrendingAds(trendingAds)
        setPersonalizedAds(personalizedAds)
        setFreshAds(freshAds)
        
      } catch (error) {
        console.error(error)
        setErrorMessage("Could not load the ads. Try again later")
      }
      
    }

    fetchAds()

  }, [])


  return (
    <div>
      <Header />
      
      <div className='dashboard'>
        
        <Searchbar onSearch={(input) => handleSearch(input)}/>
        <div className='dashboard__ads-container'>
          <AdsCarousel ads={trendingAds} header="Currently trending"/>

          <Separator />

          <AdsCarousel ads={freshAds} header="Recently added"/>

          <Separator />
          
          <AdsCarousel ads={personalizedAds} header="For you"/> 

          {/* <Ads ads={ads}/> */}
        </div>
        
      </div>
      
    </div>
  )
}

export default Dashboard
