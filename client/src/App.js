/** @format */

import "./App.css";
import { Navbar } from "./components/Navbar";
import { Image } from "./components/Image";
import { useEffect, useState } from "react";
import { CreateUser } from "./components/CreateUser";
import axios from "axios";

const nasaEndpoint = process.env.REACT_APP_NASA_ENDPOINT;
const nasaApiKey = process.env.REACT_APP_NASA_API_KEY;

function App() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [apodData, setApodData] = useState();
  const [registerModalActive, setRegisterModalActive] = useState(false);
  const [user, setUser] = useState(null);

  const fetchItems = async () => {
    const data = await fetch(
      nasaEndpoint + "planetary/apod?api_key=" + nasaApiKey
    );
    const dataJSON = await data.json();

    const data2 = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2021-10-25&concept_tags=True?api_key=xXHXsxPDZ7vpXaQtIerH1FB3fJufVbqsOZmmzZHO"
    );
    const data2JSON = await data2.json();

    console.log([dataJSON, data2JSON]);
    setApodData([dataJSON, data2JSON]);

    axios
      .post("http://localhost:5000/record/addImage", {
        image_source: dataJSON.url,
      })
      .then((res) => {
        console.log(res.data);
      });

    axios
      .post("http://localhost:5000/record/addImage", {
        image_source: data2JSON.url,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="App">
      <Navbar user={user} openRegistrationModal={setRegisterModalActive} />
      {registerModalActive && (
        <CreateUser
          active={registerModalActive}
          setActive={setRegisterModalActive}
          user={user}
          setUser={setUser}
        />
      )}
      {apodData &&
        apodData.map((element, index) => {
          return <Image user={user} key={index} source={element.url} />;
        })}
    </div>
  );
}

export default App;
