// import { useState } from 'react'
import axios from 'axios'
import './App.css'
import {DS_Button} from "./components/Button/DS_Button.jsx";
import {useEffect, useState} from "react";
import {ImageGallery} from "./components/ImageGallery/ImageGallery.jsx";


function App() {
  const [image, setImage] = useState("")
  const [breed, setBreed] = useState("")
  const [favorites, setFavorites] = useState([])
  // const [dislikeList, setDislikeList] = useState([])

  // const [response, setResponse] = useState("")

  useEffect(() => {
    fetchImage()
    fetchFavorites()
  }, [])

  const API_KEY = import.meta.env.VITE_DOG_APP_API_KEY
  // console.log(API_KEY);

  // const handleDislikeImage = (imageURL) => {
  //   setDislikeList([...dislikeList,imageURL])
  //   console.log("Dislike image", imageURL)
  //   fetchImage()
  // }

  const fetchFavorites = () => {
    axios
      .get(`https://api.thedogapi.com/v1/favourites`, {
        headers: {
          'x-api-key': API_KEY,
        },
      })
      .then((res) => {
        setFavorites(res.data);
      })
      .catch((error) => {
        console.log(new Error(error));
      });
  };

  const addToFavorites = async (imageId) => {
    const rawBody = JSON.stringify({
      "image_id": imageId,
      "sub_id":"user-123"
    });

    try {
      const response = await axios.post(
        "https://api.thedogapi.com/v1/favourites",
        rawBody,
        {
          headers: {
            'x-api-key': API_KEY,
          }
        })
      console.log(response.data)
      fetchFavorites()
    } catch (error) {
      console.log(new Error("Error adding favorites"))
    }
  };

  const fetchImage = () => {
    const URL = `https://api.thedogapi.com/v1/images/search?api_key=${API_KEY}`

    axios
      .get(URL)
      .then((res) => {
        const breedData = res.data.filter((dog) => dog.breeds && dog.breeds.length > 0)
        if (breedData.length > 0) {
          // setResponse(res.data)
          setImage(res.data[0].url)
          setBreed(res.data[0].breeds[0].name)
        }
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
      {/* <DS_Button text="Discover" backgroundColor="white" onClick={getImage}/> */}
      {/* <DS_Button text="Dislike" onClick={()=> handleDislikeImage(image)}/> */}
      <ImageGallery onClick={getImage}/>
      <div className="image-wrapper">
        <p>Breed: {breed}</p>
        <div className="image-container">
          <img src={image}
               alt="Dog"/>
        </div>

        <div className="button-container">
          <div><DS_Button onClick={getImage}
                          text="Dislike"
                          backgroundColor="red"/></div>
          <div><DS_Button onClick={getImage}
                          text="Discover"
                          backgroundColor="lightblue"/></div>
          <div><DS_Button onClick={() => addToFavorites(image.id)}
                          text="Like"
                          backgroundColor="green"/></div>
        </div>
        <div className="favorites-list">
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite.id}>
                <img src={favorite.image.url}
                     alt={breed}/>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </>
  )
}

export default App