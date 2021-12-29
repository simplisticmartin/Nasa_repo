/** @format */

import axios from "axios";
import { useState } from "react";

export const Image = ({ source, user }) => {
  const [rating, setRating] = useState("");

  const updateRating = (e) => {
    setRating(e.target.value);
    // e.preventDefault();
    const newRating = {
      source: source,
      rating: e.target.value,
    };
    console.log(newRating);

    axios
      .post("http://localhost:5000/update/" + user, newRating)
      .then((res) => console.log(res.data));
  };

  return (
    <div>
      {source && (
        <div>
          {source.includes("you") ? (
            <iframe width="420" height="315" src={source}></iframe>
          ) : (
            <img className="image" src={source} />
          )}
          <div>average: 4.9</div>
          <div>5:</div>
          <div>4:</div>
          <div>3:</div>
          <div>2:</div>
          <div>1:</div>
          <select
            onChange={updateRating}
            name="rating"
            value={rating}
            className="rating-input"
          >
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      )}
    </div>
  );
};
