import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";

const Map = withScriptjs(
  withGoogleMap((props) => {
    const { coordenadas, onClick } = props;
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: -17.7586375, lng: -63.1981685 }}
        onClick={onClick}
      >
        {coordenadas ? (
          <Marker
            position={{ lat: coordenadas.latitud, lng: coordenadas.longitud }}
          />
        ) : null}
      </GoogleMap>
    );
  })
);

export default Map;
