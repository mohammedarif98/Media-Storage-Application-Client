import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRoutes from './routes/AppRoutes'
import './index.css'
import ToastProvider from './utils/Toast/ToastProvider';


function App() {
  return (
    <>
     <ToastProvider />
      <Router>
          <Routes>
            <Route path='/*' element={ <UserRoutes /> } />
          </Routes>
      </Router>
    </>
  )
}


export default App;
