import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Article } from "../interfaces/space";
import { useEffect, useState } from "react";

const Details = () => {
  const { articleId } = useParams();
  const [singleArticle, setSingleArticle] = useState<null | Article>(null);

  const fetchSingleArticle = () => {
    fetch("https://api.spaceflightnewsapi.net/v4/articles/" + articleId)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("errore nella fetch");
        }
      })
      .then((data: Article) => {
        console.log("RESPONSE JSON", data);
        setSingleArticle(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchSingleArticle();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {singleArticle ? (
            <Card>
              <Card.Img variant="top" src={singleArticle.image_url} />
              <Card.Body>
                <Card.Title>{singleArticle.title}</Card.Title>
                <Card.Text>{singleArticle.summary}</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <Spinner animation="border" variant="warning" />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
