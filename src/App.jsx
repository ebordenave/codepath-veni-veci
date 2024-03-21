// import { useState } from 'react'
import axios from 'axios'
import './App.css'
import {Button} from "./components/Button/Button.jsx";
import {useEffect, useState} from "react";


function App() {
  const [image, setImage] = useState("")

  useEffect(() => {
    fetchImage()
  }, [])

  console.log("test", import.meta.env.VITE_DOG_APP_API_KEY)

  const fetchImage = () => {
    const URL = "https://api.thedogapi.com/v1/images/search"

    axios.get(URL)
      .then((res) => {
        setImage(res.data[0].url)
      })
      .catch((error) => {
        console.log(new Error(error))
      })
  }


  const getImage = (e) => {
    e.preventDefault()
    fetchImage()
  }


  return (
    <>
      <Button text="Discover"/>
      <img src={image}
           alt="Dog"/>
      <button onClick={getImage}>CLICK ME</button>
    </>
  )
}

export default App