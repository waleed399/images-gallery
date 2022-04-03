import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
const Search = ({word,setWord,HandleSubmit}) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={8} md={4}>
          <Form onSubmit={HandleSubmit}>
            <Form.Row>
              <Col>
                <Form.Control 
                type = "text"
                value = {word}
                onChange={(e)=>setWord(e.target.value)}
                placeholder="Search for new image..." />
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  {'Search'}
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Search;
