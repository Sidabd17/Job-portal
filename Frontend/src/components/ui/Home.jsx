import React, { useEffect } from 'react'
import Navbar from './Shared/Navbar'
import HeroSection from '../HeroSection'
import CategoryCarousel from '../CategoryCarousel'
import LatestJobs from '../LatestJobs'
import Footer from '../Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  
  const {user} = useSelector((state)=>state.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role==="recruiter") navigate('/admin/companies')
  },[])

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
