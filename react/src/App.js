import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Admin } from './pages/Admin/Admin';
import { Vendedor } from './pages/Vendedor/Vendedor';
import { Container } from '@mui/material';

export default function App() {
  return (
    <div>
      <BrowserRouter>
          <Container maxWidth={false}>
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/admin/*" element={<Admin/>}/>
              <Route path="/vendedor/:id/*" element={<Vendedor/>}/>
            </Routes>
          </Container>
      </BrowserRouter>
    </div>
  )
}