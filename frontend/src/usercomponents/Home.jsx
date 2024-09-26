import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { useSelector } from 'react-redux'
const  Home= () =>{


    const email = useSelector((state)=>state.emailData)
  return (
    <>
    <Header/>
    <Hero/>
    </>
  )
}

export default Home