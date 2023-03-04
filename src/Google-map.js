import React from 'react';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const GoogleMap = () => {
  const defaultCenter = {
    lat: 10.892441327685136,
    lng: 106.68285931540154
  };

  const defaultZoom = 12;
  const handleMarkerClick = () => {
    window.location.href = 'https://www.luburestaurant.com/';
  };
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCuspj5VCRWaw6zSOZeLaU3oGB8hX8TJxc' }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
        onChildClick={handleMarkerClick}
      >
      </GoogleMapReact>
      <Marker
              icon={{
                url: 'https://insulationpads.co.uk/wp-content/uploads/2017/10/Home.png',
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              position={{ lat: 21.027763, lng: 105.834160 }}
          ></Marker>
      {/* <Marker lat={10.892441327685136} lng={106.68285931540154}/> */}
      <AnyReactComponent
          lat={10.892441327685136}
          lng={106.68285931540154}
            text="Lubu Restaurant"
        />
    </div>
  );
};

export default GoogleMap;
