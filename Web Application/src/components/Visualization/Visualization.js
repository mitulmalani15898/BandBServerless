import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

function Visualization(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [num, setNum] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const graphHandler = (index) => {
    setNum(index);
  };

  useEffect(() => {}, []);

  const drawer = (
    <div>
      <Toolbar
        sx={{
          backgroundColor: "#eeeeee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Graphs
      </Toolbar>
      <Divider />
      <List>
        {["Customer booking ", "Customer food orders", "Booking Statistics", "Income","Feedback analysis"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => graphHandler(index)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Visualization
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {" "}
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            backgroundColor: "#eeeeee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {num === 0 && (
            <iframe
              width="800"
              height="600"
              title="bar-chart"
              src="https://datastudio.google.com/embed/reporting/0ed29d46-f772-449e-9c5a-2f8024de05f4/page/iz0xC"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          )}
          {num === 1 && (
            <iframe
              width="800"
              height="600"
              title="bar-chart"
              src="https://datastudio.google.com/embed/reporting/a9082509-beb6-4234-8b26-1d618c7b0194/page/Vt0xC"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          )}
          {num === 2 && (
            <iframe
              width="800"
              height="600"
              title="bar-chart"
              src="https://datastudio.google.com/embed/reporting/26e70154-7af7-4e17-8a0d-e8447fae3ca1/page/JB1xC"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          )}
          {num === 3 && (
            <iframe
              width="800"
              height="600"
              title="bar-chart"
              src="https://datastudio.google.com/embed/reporting/26e70154-7af7-4e17-8a0d-e8447fae3ca1/page/JB1xC"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          )}
          {num === 4 && (
            <iframe
              width="800"
              height="600"
              title="bar-chart"
              src="https://datastudio.google.com/embed/reporting/5dbed989-7fcf-4e66-819f-ae2da4eaef6a/page/df1xC"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          )}
        </Box>
      </Box>
    </Box>
  );
}

Visualization.propTypes = {
  window: PropTypes.func,
};

export default Visualization;
