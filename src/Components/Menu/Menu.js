import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountIcon from "@material-ui/icons/AccountCircleRounded";
import { Link } from "react-router-dom";
import blue from "@material-ui/core/colors/blue";
import ContactsIcon from "@material-ui/icons/ContactsRounded";
import PhotoIcon from "@material-ui/icons/PhotoRounded";
import HomeIcon from "@material-ui/icons/HomeRounded";
import LocationOnIcon from "@material-ui/icons/LocationOnRounded";
import HotelIcon from "@material-ui/icons/HotelRounded";
import { Avatar } from "@material-ui/core";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  menuBackground: {
    color: "#fff",
    backgroundColor: blue[800]
  },
  avatar: {
    margin: 10
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

const menuItems = [
  {
    name: "Home",
    path: "home",
    Icon: <HomeIcon />
  },
  {
    name: "About",
    path: "about",
    Icon: <AccountIcon />
  },
  {
    name: "Rooms",
    path: "rooms",
    Icon: <HotelIcon />
  },
  {
    name: "Gallery",
    path: "gallery",
    Icon: <PhotoIcon />
  },
  {
    name: "Location",
    path: "location",
    Icon: <LocationOnIcon />
  },
  {
    name: "Contact",
    path: "contact",
    Icon: <ContactsIcon />
  }
];

function Menu(props) {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItemsList = menuItems.map(item => (
    <Link
      to={"/" + item.path}
      style={{ textDecoration: "none", color: blue[900] }}
      onClick={handleDrawerClose}
    >
      <MenuItem>
        <ListItemIcon style={{ color: blue[700] }}>{item.Icon}</ListItemIcon>
        <Typography style={{ color: blue[700] }}>{item.name}</Typography>
      </MenuItem>
    </Link>
  ));

  const getMenuItems = () => {
    return <MenuList>{menuItemsList}</MenuList>;
  };

  const { classes, theme, children } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, classes.menuBackground, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Avatar alt="logo" src={props.logo} className={classes.avatar} />
          </Link>
          <Typography variant="h6" color="inherit" noWrap>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {getMenuItems()}
      </Drawer>

      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <div>{children}</div>
      </main>
    </div>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(Menu);
