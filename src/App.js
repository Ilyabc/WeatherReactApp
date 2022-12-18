import React, { useState } from 'react';
import { useDispatch, useSelector} from "react-redux";
import ItemCard from './components/ItemCard';
import { removeAllCitiesAction, removeCityAction} from './store/cityReducer';
import { fetchCityInfo } from './asyncActions/cityInfo';
import { Button, Input, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    maxWidth: 1310,
    margin: '0 auto',
    padding: '0 40px',
  },
	cardList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '40px',
  },
  sitenav: {
    margin: " 30px 0 60px 0",
  },
  sitenavBtnAdd: {
    backgroundColor: '#e6edf5',
    margin: '0 20px',
    marginBottom: '7px'
  },
  sitenavBtnRemove: {
    backgroundColor: '#ffdbdb',
    marginBottom: '7px'
  },
  input: {
    color:'grey'
  },
});
  
function App() {

  const [city, setCity] = useState('')
  const classes = useStyles();
  const cities = useSelector(state => state.cities.cities)

  const removeAllCities = (city) => {
    dispatch(removeAllCitiesAction(cities))
  }
  
  let addCity = function(city) {
    dispatch(fetchCityInfo(city))
    setCity('')
  }

  let removeCity = function(city) {
    dispatch(removeCityAction(city.id))
  }

  const dispatch = useDispatch()

  return (
    <div className={classes.wrapper}>
      <div className={classes.sitenav}>
        <Input value={city} onChange={(event) => setCity(event.target.value)} className={classes.input}></Input>
        <Button onClick={() => addCity(city)} className={classes.sitenavBtnAdd} variant='contained'>Add city</Button>
        <Button onClick={() => removeAllCities(city)} className={classes.sitenavBtnRemove} variant='contained'>remove all</Button>
      </div>
      <div className={classes.cardList}>
        {cities.length > 0 ?cities.map((city, index )=> 
          <ItemCard city={city} index={index} key={index} removeCity={removeCity}/>
        ):<Typography variant="h5" color='textSecondary'>Add sity</Typography> } 
      </div> 
    </div>
  );
};

export default App;


