// import logo from './logo.svg';
import './App.css';
import AllRoutes from './components/AllRoutes';
// import Blog from './layouts/blog/Blog';
// import SignIn from './layouts/auth/SignIn';

// @mui material components
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context/context.js";

function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;

  return (
    <ThemeProvider theme={ darkMode ? themeDarkRTL : themeRTL}>
      <CssBaseline />
      <AllRoutes></AllRoutes>
    </ThemeProvider> 
  );
}

export default App;
