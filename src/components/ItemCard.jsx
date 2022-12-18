import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Maps from './Maps';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles({
	root: {
	  width: 295,
	  overflow: 'hidden'
	},
	name:{
		display: 'flex',
		justifyContent: 'space-between'
	},
	title: {
	  fontSize: 18,
	},
	temperature: {
	  margin: '12px 0',
	  fontSize: 28
	},
	weatherFeels: {
		marginTop: 30
	},
	weatherStatus: {
		marginTop: 5
	},
	refreshBtn: {
		color: '',
		fontSize: 12,
		margin: '0 7px 7px 7px',
		color :"#749ab0",
		borderColor: '#749ab0'
		},
	info: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		zIndex: 1000
	},
	infoMain: {
		width: 420,
		height:350,
		padding: '30px 60px',
		backgroundColor: '#FFFFFF',
		position: 'relative',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		boxRhadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.2)',
		borderRadius: '4px'
	},
	infoName: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	infoTitle: {
		textAlign: 'center'
	},
	infoMap: {
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: '30px'
	},
	infoFeelsLike: {
		fontSize: 18,
		marginTop: 15
	},
	infoWeather: {
		fontSize: 20,
		marginTop: 10
	},
	infoVisibility: {
		marginTop: 17,
		fontSize: 16,
		marginBottom: 15
	},
	infoTemp: {
		margin: '5px 0',
		fontSize: 14
	},
	infoCloseIcon: {
		cursor: 'pointer'
	}
});
  
const ItemCard = ({city, index, removeCity}) => {

	const [data, setData] = useState(city.data)
	const [infoWindow, setInfoWindow] = useState(false)

	const request = (name) => {
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=ab0a9d2f11bdf9e3aa824df29904fae5&units=metric&lang=ua`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setData(data)
			});
	}

	const classes = useStyles();
	return (
		<div key={index} className={classes.test}>
			<Card className={classes.root} variant="outlined">
				<CardContent>
					<div className={classes.name}>
						<Typography className={classes.title} color="textSecondary">
							Current weather In {data.name}
						</Typography>
						<CloseIcon color='action' className={classes.infoCloseIcon} onClick={() => removeCity(city)}></CloseIcon>
					</div>
					<Typography className={classes.temperature} color="textSecondary">
						{data.main.temp}°
					</Typography>
					<Typography variant="body1" component="p" color="textSecondary" className={classes.weatherFeels}>
						Feels like {data.main.feels_like} 
					</Typography>		
					<Typography variant="h6" component="p" color="textSecondary" className={classes.weatherStatus}>
						{data.weather[0].main} 
					</Typography>	
				</CardContent>
				<CardActions>
					<Button size="small" variant='outlined' onClick={() => request(data.name)} className={classes.refreshBtn}>Refresh</Button>
					<Button size="small" variant='outlined' onClick={() => setInfoWindow(true)} className={classes.refreshBtn}>More info</Button>
				</CardActions>
			</Card> 
			{infoWindow ? <div className={classes.info}>
				<div className={classes.infoMain}>
					<div>
						<div className={classes.infoName}>
						<Typography variant='h5' className={classes.infoTitle} color="textSecondary">
							Current weather In {data.name} , {data.sys.country}
						</Typography>
						<CloseIcon color='action' className={classes.infoCloseIcon} onClick={() => setInfoWindow(false)}></CloseIcon>
						</div>
						<div className={classes.infoMap}>
							<div>
								<Typography variant='h4' color="textSecondary">
									{data.main.temp}°
								</Typography> 
								<Typography className={classes.infoWeather} color="textSecondary">
									{data.weather[0].main} ({data.weather[0].description})
								</Typography> 
								<Typography className={classes.infoFeelsLike} color="textSecondary">
									Feels like {data.main.feels_like}°
								</Typography> 
								<Typography className={classes.infoVisibility} color="textSecondary">
									Visability {data.visibility}
								</Typography> 
								<Typography className={classes.infoTemp} color="textSecondary">
									Temp min {data.main.temp_min}°
								</Typography> 
								<Typography className={classes.infoTemp} color="textSecondary">
									Temp max {data.main.temp_max}°
								</Typography> 
								<Typography className={classes.infoTemp} color="textSecondary">
									Temp max {data.main.temp_max}°
								</Typography> 
							</div>
							<Maps location={data.coord} className={classes.map}/>
						</div>
					</div>
				</div>
      		</div> : null}
		</div>
	);
};

export default ItemCard;