import React from "react";
import { useState } from "react";
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

  const HandleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(
      `${API_URL}/new-image?query=${word}`)
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
