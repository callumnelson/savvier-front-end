// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
import ChangePassword from './pages/ChangePassword/ChangePassword'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as profileService from './services/profileService'

// styles
import './App.css'

// types
import { Profile, User } from './types/models'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [profile, setProfile] = useState<Profile | null>(null)
  const navigate = useNavigate()

  useEffect((): void => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const profileData = await profileService.getUserProfile()
        setProfile(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    user ? fetchProfile() : setProfile(null)
  }, [user])
  
  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    setProfile(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  return (
    <>
    {user 
      && 
    <NavBar 
      user={user} 
      profile={profile}
      handleLogout={handleLogout} 
    />
    }
    <Routes>
      <Route path="/" element={<Landing user={user} />} />
      <Route path="/dashboard" element={<Dashboard user={user}/>}/>
      <Route
        path="/auth/signup"
        element={<Signup handleAuthEvt={handleAuthEvt} />}
      />
      <Route
        path="/auth/login"
        element={<Login handleAuthEvt={handleAuthEvt} />}
      />
      <Route
        path="/auth/change-password"
        element={
          <ProtectedRoute user={user}>
            <ChangePassword handleAuthEvt={handleAuthEvt} />
          </ProtectedRoute>
        }
      />
    </Routes>
  </>
  )
}

export default App
