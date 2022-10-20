import react from 'react';
import {useState,useEffect} from 'react'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import BedIcon from '@mui/icons-material/BedOutlined';
import BathtubIcon from '@mui/icons-material/BathtubOutlined';
import BungalowIcon from '@mui/icons-material/BungalowOutlined';
import Icon from '@mui/icons-material/FavoriteBorderOutlined';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { createTheme, responsiveFontSizes,ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import {
    Typography,
    Grid,
    Box,
    makeStyles,
    Card,Button
  } from "@material-ui/core";

  let theme = createTheme();
theme = responsiveFontSizes(theme);

  const useStyles = makeStyles((theme) => ({
    typo:
    {
        flexGrow:1,
        textAlign:"center",
        color:"black",
        fontWeight:510,
    },
    input:
    {
      width:"40%",
      height:"50%",
      marginTop:"4%"
    },
    date:
    {
      marginLeft:"50%",
    },
    Card: {
        width: 360,
        margin: 'auto',
      },
      Media: {
        height: 550,
        width: 310,
        objectFit: 'cover'
      }
  }));


function Layout()
{
    const classes = useStyles();
    const [info,setinfo]=useState([{name:"",image:"",address:"",price:0,Beds:"",Bathrooms:"",area:"",state:"",type:"",date:""}])
    const[location,setlocation]=useState("")//setting default value to all
    const[price,setprice]=useState("");
    const[type,settype]=useState("")
    const [date, setdate] = useState(dayjs('2022-10-20'));
    const[check,setcheck]=useState(1);
    console.log(date.$d.getTime())
    const theme = createTheme();

    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle.
      while (currentIndex != 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }

    const handle=()=>{
      if(check===0)
      setcheck(1)
      else
      setcheck(0)
    }

    const FilterByLocation=(array)=>{
       if(location!=="")
       {
        return array.filter((index)=>index.state===location)
       }
       else
       {
        return array
       }
    }

    const FilterByType=(array)=>{
      if(type!=="")
      {
        return array.filter((index)=>index.type===type)
      }
      else
      {
        return array;
      }
    }

    const FilterByPrice=(array)=>{
      if(price!==""){
      const pricesArray=price.split("-")
      return array.filter((index)=>index.price>=Number(pricesArray[0])&&index.price<=Number(pricesArray[1]))
      }
      else
      {
        return array;
      }
    }

    const FilterByDate=(array)=>{
      return array.filter((index)=>(new Date(index.date)).getTime()<=date.$d.getTime())
    }
    
    const getData=()=>{
        fetch('dummy-data.json',
        {
            header:{
                'Content-Type':'dummy-data.json',
                'Accept':'dummy-data/json'
            }
        }
        )
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function(myJson){
            console.log(myJson)
            let result=myJson
            console.log((new Date(result[0].date)).getTime())
            result=FilterByLocation(result);
            result=FilterByType(result);
            result=FilterByPrice(result)
            result=FilterByDate(result)
            console.log(result)
            shuffle(result)
            setinfo(result)
      })
    }
    useEffect(()=>{
        getData()
    },[check])
  return(
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} style={{marginTop:"3%"}} direction="row" justify="center" alignItems="center">
        <Grid item md={8} xs={8} sm={12}>
          <ThemeProvider theme={theme}>
          <Typography className={classes.typo} variant="h3" >Search Properties to Rent</Typography>
          </ThemeProvider>
        </Grid>
        <Grid item md={4} xs={4}>
        <TextField id="outlined-basic" label="Search By Name" variant="outlined" />
        </Grid>
      </Grid>
    </Box>

    <Box sx={{flexgrow:1}}>
      <Grid container spacing={2} style={{marginTop:"2%"}}direction="row"
                justify="center"
                alignItems="flex-start">
        <Grid item xs={6} md={2}>
        <InputLabel id="demo-simple-select-standard-label" style={{marginLeft:"10%"}}>Location</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Location"
          value={location}
          style={{marginLeft:"10%",width:"60%"}}
          onChange={(e)=>{setlocation(e.target.value)}}

        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={"New York"}>New York</MenuItem>
          <MenuItem value={"Ohio"}>Ohio</MenuItem>
          <MenuItem value={"Michigan"}>Michigan</MenuItem>
        </Select>
        </Grid>

        <Grid item xs={6} md={2}>
        <InputLabel id="demo-simple-select-standard-label-1" style={{marginLeft:"10%"}}>Price</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label-1"
          id="demo-simple-select-standard"
          label="Loctation"
          value={price}
          style={{width:"60%"}}
          onChange={(e)=>{setprice(e.target.value)}}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={"1000-1500"}>1000-1500$</MenuItem>
          <MenuItem value={"1500-1700"}>1500-1700$</MenuItem>
          <MenuItem value={"1700-2000"}>1700-2000$</MenuItem>
          <MenuItem value={"2000-2500"}>2000-2500$</MenuItem>
        </Select>
        </Grid>

        <Grid item xs={6} md={2}>
        <InputLabel id="demo-simple-select-standard-label-2" style={{marginLeft:"10%"}}>Property Type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label-2"
          id="demo-simple-select-standard"
          label="Property Type"
          value={type}
          onChange={(e)=>{settype(e.target.value)}}
          style={{width:"60%",marginLeft:"10%"}}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={"Houses"}>Houses</MenuItem>
          <MenuItem value={"Offices"}>Offices</MenuItem>
          <MenuItem value={"Hotels"}>Hotels</MenuItem>
        </Select>
        </Grid>

        <Grid item xs={6} md={2}>
        <InputLabel id="demo-simple-select-standard-label-3">Move-in Date(19,20,21,22,Oct)</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          inputFormat="MM/DD/YYYY"
          value={date}
          onChange={(e)=>{setdate(e)}}
          className={classes.date}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
        </Grid>

       
        <Grid item xs={12} md={2} style={{marginTop:"2%"}}>
            <Button style={{marginLeft:"35%",marginRight:"40%",backgroundColor:"blue",color:"white"}} size="large" onClick={handle}>Search</Button>
        </Grid>
      </Grid>
    </Box>

    <Box sx={{flexGrow:1}}>
        <Grid container spacing={5}direction="row"
                justify="flex-start"
                alignItems="flex-start" style={{marginTop:"3%"}}>
            { info.map((index)=>(
            <Grid item xs={12} sm={6} md={4} >
            <Card className={classes.Card}xs={4}>
             <CardMedia
               component="img"
               height="140"
               image={index.image}
               alt="">
             </CardMedia>
             <CardContent>
                <Typography style={{color:"purple",fontWeight:1000,fontFamily:"Poppins"}}variant="h6" component="div">
                 {index.price}$/month <Icon style={{marginLeft:"50%",color:"grey"}}></Icon>
                </Typography>
                <Typography style={{fontFamily:"Poppins",fontWeight:1000}}variant="h5"component="div">
                    {index.name}
                </Typography>
                <Typography style={{marginTop:"4%",color:"grey"}}variant="body2">
                    {index.address}
                </Typography>
             </CardContent>
             <CardActions>
                <BedIcon style={{color:"purple"}}></BedIcon><Typography variant="h7" style={{color:"grey",fontFamily:"poppins",fontWeight:400}}>{index.Beds} Beds</Typography>
                <BathtubIcon style={{marginLeft:"10%",color:"purple"}}></BathtubIcon><Typography variant="h7" style={{color:"grey",fontFamily:"poppins",fontWeight:400}}>{index.Bathrooms} Bathrooms</Typography>
                <BungalowIcon style={{marginLeft:"10%",color:"purple"}}></BungalowIcon><Typography style={{color:"grey",fontFamily:"poppins",fontWeight:400}}>{index.area}</Typography>
             </CardActions>
            </Card>  
            </Grid>
            ) 
           )}
        </Grid>
    </Box>
    </>
  )

}

export default Layout;