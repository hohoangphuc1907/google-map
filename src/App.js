import { SkeletonText } from "@chakra-ui/react";
import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng, 
} from "react-places-autocomplete";
import './App.css';

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const [address, setAddress] = useState("");
  const [center, setCenter] = useState({ lat: 10.7913, lng: 106.7037 });
  const [markers, setMarkers] = useState([]);
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setMarkers([...markers, latLng]);
    setCenter(latLng);
    
  };
  if (!isLoaded) {
    return <SkeletonText />;
  }
  const handleClick = event => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Chuyển sang trang mới
    window.open(`https://www.luburestaurant.com?coords=${lat},${lng}`);
  };
  return (
    <div >
       <PlacesAutocomplete
        value={address}
        onChange={(value) => setAddress(value)}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "Nhập địa chỉ" })} />
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
      </PlacesAutocomplete>
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
        
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} onClick={handleClick} />
        ))}
      </GoogleMap>
      </div>
   
    </div>
  );
}

export default App;
