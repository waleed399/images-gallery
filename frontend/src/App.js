import React from "react";
import axios from 'axios';
import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import { Container, Row, Col } from "react-bootstrap";
import Welcome from "./components/welcome";

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050'

function App() {
  const [word, setWord] = useState("");
  const [images, SetImages] = useState([]);

  const getSavedImages = async () =>{
    try {
      const res = await axios.get(`${API_URL}/images`)
      SetImages(res.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => getSavedImages(), [])
  
  const HandleSearchSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      SetImages([{ ...res.data, title: word }, ...images]);
    } catch (error) {
      console.log(error);
    }

    setWord("");
  };

  const HandleDeleteImage = (id) => {
    SetImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} HandleSubmit={HandleSearchSubmit} />
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className="pb-3">
                <ImageCard image={image} deleteImage={HandleDeleteImage} />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
}

export default App;
