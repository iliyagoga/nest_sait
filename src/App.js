import { Navigate, Route, Routes} from 'react-router-dom';
import { config } from './config.ts';
import AdminPanel from './pages/AdminPanel.jsx';
import Login from './pages/Auth.jsx';
import './assets/styles/css/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MeanPage from './pages/MeanPage.jsx';
import Catalog from './pages/Catalog.jsx';
import ProductPage from './components/client/ProductPage.jsx';
import Profile from './pages/Profile.jsx';
import Cart from './pages/Cart.jsx';
function App() {
  return <>
  <Routes>
    <Route path={config.adminPanel} element={
      <AdminPanel></AdminPanel>
    }>
    </Route>

    <Route path={config.reg} element={
      <Login mode={true}></Login>
          }>
    </Route>
    <Route path={ config.mean} element={
            <MeanPage></MeanPage>
          }>
    </Route>
    <Route path={ config.catalog} element={
            <Catalog></Catalog>
          }>
    </Route>
    <Route path={ config.login} element={
            <Login></Login>
          }>
    </Route>
    <Route path={ config.product} element={
            <ProductPage></ProductPage>
          }>
    </Route>
    <Route path={ config.profile} element={
            <Profile></Profile>
          }>
    </Route>
    <Route path={ config.cart} element={
            <Cart></Cart>
          }>
    </Route>
    <Route path={ '/*'} element={
          <MeanPage></MeanPage>
          }>
    </Route>
  
  </Routes>
  </>
}

export default App;
