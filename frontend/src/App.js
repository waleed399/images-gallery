import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import { Container, Row, Col } from "react-bootstrap";
import Welcome from "./components/welcome";
import Spinner from "./components/Spinner";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

function App() {
  const [word, setWord] = useState("");
  const [images, SetImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      SetImages(res.data || []);
      setLoading(false);
      if(res.data.length){toast("Saved images downloaded successfully !!!");}
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getSavedImages(), []);

  const HandleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      SetImages([{ ...res.data, title: word }, ...images]);
      toast.info(`New Image ${word.toUpperCase()} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

    setWord("");
  };

  const handleSaveImage = async (id) => {
    const imageToSave = images.find((image) => image.id === id);
    imageToSave.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToSave);
      if (res.data && res.data.inserted_id) {
        SetImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
      }
      toast.success("Image was saved to DB successfully !!!");
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  const HandleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);

      if (res.data && res.data.deleted_id) {
        SetImages(images.filter((image) => image.id !== id));
      }
      toast.warning(`Image ${images.find((i) => i.id ===id).title.toUpperCase()} was deleted from DB`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Header title="Images Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search
            word={word}
            setWord={setWord}
            HandleSubmit={HandleSearchSubmit}
          />
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={HandleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" />
</div>
  )}
  export default App;
