import { SkeletonText } from "@chakra-ui/react";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const center = { lat: 10.892441327685136, lng: 106.68285931540154 };

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

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
        <Marker position={center} onClick={handleClick} />
      </GoogleMap>
    </div>
  );
}

export default App;
