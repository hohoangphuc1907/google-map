import { SkeletonText } from "@chakra-ui/react";
import React, { useState, useEffect  } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng, 
} from "react-places-autocomplete";
import './App.css';
import axios from 'axios';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [center, setCenter] = useState({ lat: 10.7913, lng: 106.7037 });
  const [markers, setMarkers] = useState([{latLng: {lat: 10.7913, lng: 106.7037}, link:"https://www.luburestaurant.com"}]);
  const [map, setMap] = useState([]);
  const fetchData = async () => {
    const response = await fetch('http://localhost:3300/google-map');
    const data = await response.json();
    setMap(data);
   
  };
  useEffect(() => {
    fetchData();
  }, []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB0beh5crFuBiPHyKLLB3_zLDJgMLxQGZo",
    libraries: ["places"],
  });
  const handleSelect = async (value) => {
    
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setMarkers([...markers, {latLng: latLng, link: "https://www.luburestaurant.com"}]);
    setCenter(latLng);
    const { lat, lng } = latLng;
    axios.post('http://localhost:3300/google-map', { name: roomName, address: {lat: lat, lng: lng} , price: price })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    setIsFormVisible(false);
    
  };
  if (!isLoaded) {
    return <SkeletonText />;
  }
  const handleClick = (event, link) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Chuyển sang trang mới
    window.open(`${link}?coords=${lat},${lng}`);
  };
 
  const handleGetRoom = () => {
    axios.get('http://localhost:3300/google-map', { name: roomName, address: {lat: 10.8230989, lng: 106.6296638} , price: price })
    .then(response => {
      console.log(response.data.id);
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div >
       {/* <PlacesAutocomplete
        value={address}
        onChange={(value) => setAddress(value)}
        // onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input style={{width:"100%" }} {...getInputProps({ placeholder: "Nhập địa chỉ" })} />
            <div>
              {loading ? <div>Loading...</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { style })}
                    key={suggestion.placeId}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete> */}
    <div>
      <a href="#" onClick={() => setIsFormVisible(true)}>Tạo phòng</a>
      {isFormVisible && (
        <form onSubmit={handleSelect}>
          <label>
            Tên phòng:
            <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
          </label>
          <label>
            Địa chỉ:
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
          <label>
            Giá:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          <button type="submit">Tạo phòng</button>
        </form>
      )}
    </div>
    <div>
      <a href="#" onClick={handleGetRoom}>Lấy phòng</a>
    </div>

      <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        
        {map.map((marker, index) => (
          <Marker key={index} position={marker.address} onClick={(e) => handleClick(e, marker.link)} />
        ))}
      </GoogleMap>
      </div>
   
    </div>
  );
}

export default App;
