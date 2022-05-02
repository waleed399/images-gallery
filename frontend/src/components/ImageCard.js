import React from "react";
import { Card, Button} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Nav } from "react-bootstrap";
const ImageCard = ({ image, deleteImage, saveImage }) => {
  const authorName = image.user.name || "no author name"
  const authorPortfolioURL = image.user && image.user.portfolio_url
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image.urls.small} />
      <Card.Body>
        <Card.Title>{image.title && image.title.toUpperCase()}</Card.Title>
        <Card.Text>{image.description || image.alt_description}</Card.Text>
        <Button variant="primary" onClick={() => deleteImage(image.id)}> Delete
        </Button>{' '}
        {!image.saved && <Button variant="secondary" onClick={() => saveImage(image.id)}>
          Save
          </Button>}
      </Card.Body>
      <Card.Footer className="text-center text-muted">
        {authorPortfolioURL && (
        <Nav.Link href={authorPortfolioURL} target="_blanc">{authorName}</Nav.Link>
        )}
        {!authorPortfolioURL && authorName}
      </Card.Footer>
    </Card>
  );
};

export default ImageCard;
