import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Article, SpaceFlight } from "../interfaces/space";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [spaceArticles, setSpaceArticles] = useState<Article[]>([]);

  const fetchSpaceArticles = function () {
    fetch("https://api.spaceflightnewsapi.net/v4/articles")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("errore nella fetch");
        }
      })
      .then((data: SpaceFlight) => {
        console.log("RESPONSE JSON", data);
        setSpaceArticles(data.results);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchSpaceArticles();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="content h-100">
      <h1 className="text-center text-light">ARTICOLI SPAZIALI</h1>
      <Container>
        <Row>
          {spaceArticles.map((article) => (
            <Col xs={12} md={3} key={article.id}>
              <Card>
                <Card.Img variant="top" src={article.image_url} />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.summary}</Card.Text>
                  <Button
                    onClick={() => {
                      navigate("/details/" + article.id);
                    }}
                  >
                    DETTAGLI
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
