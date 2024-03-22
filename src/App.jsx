// import { useState } from 'react'
import axios from 'axios'
import './App.css'
import {DS_Button} from "./components/Button/DS_Button.jsx";
import {useEffect, useState} from "react";
import {ImageGallery} from "./components/ImageGallery/ImageGallery.jsx";
import {
  AttributesButton
} from "./components/AttributesButton/AttributesButton.jsx";


function App() {
  const [image, setImage] = useState("")
  const [breed, setBreed] = useState("")
  const [banList, setBanList] = useState([])
  // const [favorites, setFavorites] = useState([])
  // const [dislikeList, setDislikeList] = useState([])
  // const [response, setResponse] = useState("")

  const API_KEY = import.meta.env.VITE_DOG_APP_API_KEY

  useEffect(() => {
    fetchImage()
  },[])

  useEffect(() => {
    console.log(banList)
  }, [banList])


  const fetchImage = () => {
    const URL = `https://api.thedogapi.com/v1/images/search?api_key=${API_KEY}`

    axios
      .get(URL)
      .then((res) => {
        const filteredData = res.data.filter((dog) => dog.breeds && dog.breeds.length > 0 && !banList.includes(dog.breeds[0].name))
        if (filteredData.length > 0) {
          // setResponse(res.data)
          setImage(filteredData[0].url)
          setBreed(filteredData[0].breeds[0].name)
        }
      })
      .catch((error) => {
        console.log(new Error(error))
      })
  }

  const addToBanList = (breed) => {
    setBanList((prevBanList) => {
      return [...prevBanList, breed];
    });
  };


  const getImage = (e) => {
    e.preventDefault()
    fetchImage()
  }


  return (
    <>
      <ImageGallery onClick={getImage}/>
      <div className="image-wrapper">
        <div className="image-container">
          <img src={image}
               alt="Dog"/>
        </div>

        <div className="button-container"></div>
          <div><DS_Button onClick={getImage}
                          text="Discover"
                          backgroundColor="lightblue"/></div>
        </div>
      <div>
        <AttributesButton attribute={breed} backgroundColor="orange" onClick={()=> addToBanList(breed)}/>
        <AttributesButton attribute={breed} backgroundColor="orange"/>
        <AttributesButton attribute={breed} backgroundColor="orange"/>
        <AttributesButton attribute={breed} backgroundColor="orange"/>
      </div>

    </>
  )
}

export default App