
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import AppRoutes from './routes/appRoutes'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
