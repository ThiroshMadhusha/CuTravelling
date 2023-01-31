import React, { useRef } from "react";
import "./searchbar.css";
import { Col, Form, FormGroup } from "reactstrap";

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);

  const searchHandler = () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
      const maxGroupSize = maxGroupSizeRef.current.value;
      
      if (location === '' || distance === '' || maxGroupSize === '') {
          return alert("All Fields are Must Required..!")
      }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i class="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where Are You Going..?"
                ref={locationRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i class="ri-pin-distance-line"></i>
            </span>
            <div>
              <h6>Distance (k/m)</h6>
              <input
                type="number"
                min="1"
                placeholder="Distance k/m"
                ref={distanceRef}
              />
            </div>
          </FormGroup>{" "}
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <i class="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input
                type="number"
                min="1"
                placeholder="How Many People..?"
                ref={maxGroupSizeRef}
              />
            </div>
          </FormGroup>
          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i class="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
