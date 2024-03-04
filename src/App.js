import { Navigate, Route, Routes} from 'react-router-dom';
import { config } from './config.ts';
import AdminPanel from './pages/AdminPanel.jsx';
import Login from './pages/Auth.jsx';
import './assets/styles/css/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return <>
  <Routes>
    <Route path={config.adminPanel} element={
      <AdminPanel></AdminPanel>
    }>
    </Route>

    <Route path={config.reg} element={
      <Login mode={true}></Login>
    }></Route>

    <Route path={ '/*' || config.login} element={
          <Login mode={false}></Login>
        }>
    </Route>
  
  </Routes>
  </>
}

export default App;
