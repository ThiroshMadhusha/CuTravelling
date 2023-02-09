import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "../shared/TourCard";
// import tourData from "../assets/data/tours";
import SearchBar from "../shared/SearchBar";
import NewsLetter from "../shared/NewsLetter";
import { Container, Row, Col } from "reactstrap";

import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Tours = () => {
  // Add pagination
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCounts } = useFetch(
    `${BASE_URL}/tours/search/getTourCount`
  );

  useEffect(() => {
    const pages = Math.ceil(tourCounts / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCounts, tours]);

  return (
    <>
      {/* shared --> common css and page */}
      <CommonSection title={"Our Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      {/* Add tour data */}
      <section>
        <Container className="pt-0">
          {loading && <h4 className="text-center pt-5">Loading.....</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      {/* add newsletter */}

      <NewsLetter />
    </>
  );
};

export default Tours;
