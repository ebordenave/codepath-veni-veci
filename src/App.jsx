import axios from 'axios'
import './App.css'
import {DS_Button} from "./components/Button/DS_Button.jsx";
import {useEffect, useState} from "react";
import {ImageGallery} from "./components/ImageGallery/ImageGallery.jsx";
import {
  AttributesButton
} from "./components/AttributesButton/AttributesButton.jsx";
import {BanList} from "./components/BanList/BanList.jsx";
import {SeenList} from "./components/SeenList/SeenList.jsx";

const App = () => {
  const [image, setImage] = useState("")
  const [attributes, setAttributes] = useState({
    breed: "",
    weight: [],
    breedGroup: [],
    lifeSpan: []
  })
  const [banList, setBanList] = useState([])
  const [seenList, setSeenList] = useState([])

  const API_KEY = import.meta.env.VITE_DOG_APP_API_KEY

  // useEffect(() => {
  //   fetchImage()
  // }, [])

  const fetchImage = async () => {
    const URL = `https://api.thedogapi.com/v1/images/search?has_breeds=1&api_key=${API_KEY}`;

    try {
      const response = await axios.get(URL);
      const responseData = response.data.filter((dog) => {
        const {name, weight, breed_group, life_span} = dog.breeds[0];
        const dogAttributes = [name, weight.imperial, breed_group, life_span];
        return !dogAttributes.some((attribute) => banList.includes(attribute));
      });

      // console.log("👀", responseData[0])
      // console.log(banList)

      if (responseData.length > 0) {
        const {url, breeds} = responseData[0];
        const {name, weight, breed_group, life_span} = breeds[0];
        setImage(url);
        setAttributes({
          breed: name,
          weight: weight.imperial,
          breedGroup: breed_group,
          lifeSpan: life_span
        });
        addToSeenList(name)
      }
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  const addToSeenList = (breedName) => {
    setSeenList((prevSeenList) => [...prevSeenList, breedName]);
  }

  const addToBanList = (attribute) => {
    setBanList((prevBanList) => {
      return [...prevBanList, attribute]
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
          <img src={image} alt="Dog"/>
        </div>
        <div className="button-container">
          {Object.entries(attributes).map(([key, value]) => (
            <AttributesButton key={key} attribute={value} backgroundColor="orange" onClick={()=> addToBanList(value)}/>
          ))}
        </div>
        <div>
          <DS_Button onClick={getImage} text="Discover" backgroundColor="lightblue"/>
        </div>
      </div>
      <div className="list-container">
        <SeenList list={seenList}/>
        <BanList list={banList}/>
      </div>
    </>
  )
}

export default App