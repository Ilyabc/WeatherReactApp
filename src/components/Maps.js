import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { makeStyles } from "@material-ui/core";

const API_KEY = process.env.REACT_APP_API_KEY

const useStyles = makeStyles({
	mapContainer: {
		height: '250px',
		width: '250px',
		borderRadius: '5px'
	},
})

export default function Maps({location}) {
const classes = useStyles();
const defaultMapOptions = {
	disableDefaultUI: true
};
  
const { isLoaded } = useLoadScript({
googleMapsApiKey: API_KEY,
});

if (!isLoaded) return <div>Loading...</div>;
return <Map /> 

  function Map() {
    const center = useMemo(() => ({ lat : parseFloat(location.lat), lng: parseFloat(location.lon)}), []);
    return (
      <GoogleMap 
	  	zoom={10}     
		options={defaultMapOptions}
	  	center={center} 
		style={classes.mapStyle}
		mapContainerClassName={classes.mapContainer}>
        <Marker position={center} />
      </GoogleMap>
    );
  }

}
