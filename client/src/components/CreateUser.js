/** @format */

import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const CreateUser = ({ active, setActive, user, setUser }) => {
  const ref = useRef();

  const [email, setEmail] = useState("");

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    console.log(active);
    if (active) {
      if (ref.current.contains(e.target)) {
        console.log("clicked inside");
        return;
      }
      console.log("clicked outside");
      setActive(false);
    }
  };

  const createUser = (e) => {
    e.preventDefault();
    const newperson = {
      email: email,
      ratings: {},
    };
    axios.post("http://localhost:5000/record/add", newperson).then((res) => {
      console.log(res.data);
      setUser(res.data.insertedId);
    });

    setActive(false);
  };
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      {active && (
        <div>
          <div className="blocker"></div>
          <div className="createuser-modal" ref={ref}>
            <h2>Register</h2>
            <h5>We'll only need your email</h5>
            <form onSubmit={createUser}>
              <input
                type="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
                name="email"
              />
              <input type="submit" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
