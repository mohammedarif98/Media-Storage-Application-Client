import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRoutes from './routes/AppRoutes'
import './index.css'


function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path='/*' element={ <UserRoutes /> } />
          </Routes>
      </Router>
    </>
  )
}


export default App;
