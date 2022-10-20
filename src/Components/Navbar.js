import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import logo from '../Images/Home.jpg';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginRight: theme.spacing(70),
    display: "flex",
  },
  navButtons:{
    display:"flex",
    marginLeft: theme.spacing(-50),
   
  },
  Buttons:{
   marginRight:theme.spacing(10),
  },
 logo: {
    flexGrow: "0.7",
    cursor: "pointer",
    color:"black",
  },
  imglogo:{
   width:"7%",
   height:"4%",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    marginLeft: theme.spacing(14),
    "&:hover": {
      color: "blue",
      borderBottom: "1px solid blue",
    },
  },
}));



function Navbar() {
  const classes = useStyles();

  return (
    <>
    <AppBar style={{backgroundColor:"white"}}position="static" className="nav">
      <CssBaseline />
      <Toolbar>
        <img className={classes.imglogo}src={logo}/>
        <Typography variant="h4" className={classes.logo}>
          Estatery
        </Typography>
          <div className={classes.navlinks}>
            <a href="#" className={classes.link}>
              Rent
            </a>
            <a href="#" className={classes.link}>
              Buy
            </a>
            <a to="#" className={classes.link}>
              Sell
            </a>
            <a to="#" className={classes.link}>
              Resources
            </a>
          </div>
          <div className={classes.navButtons}>
            <Button style={{backgroundColor:"blue",color:"white"}}className={classes.Buttons} variant="contained"size="large">Login</Button>
            <Button style={{borderColor:"blue",color:"blue"}}variant="outlined"size="large">Sign Up</Button>
          </div>
      </Toolbar>
    </AppBar>
    
    </>
  );
}
export default Navbar;
