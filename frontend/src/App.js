import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import { Container, Row, Col } from "react-bootstrap";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [word, setWord] = useState("");
  const [images, SetImages] = useState([]);

  const HandleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetImages([{ ...data, title: word }, ...images]);
      })
      .catch((err) => {
        console.log(err);
      });
    setWord("");
  };

  const HandleDeleteImage = (id)=>{
    SetImages(images.filter((image)=> image.id!==id));
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} HandleSubmit={HandleSearchSubmit} />
      <Container className="mt-4">
        <Row xs={1} md={2} lg={3}>
          {images.map((image, i) => (
            <Col key={i} className = "pb-3">
              <ImageCard image={image} deleteImage={HandleDeleteImage}/>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
