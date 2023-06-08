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
import Transactions from './pages/Transactions/Transactions'
import Loading from './pages/Loading/Loading'
import Schema from './pages/Schema/Schema'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [profile, setProfile] = useState<Profile | null>(null)
  const navigate = useNavigate()

  useEffect((): void => {
    const fetchProfile = async (): Promise<void> => {
      try {
        console.log('fetching')
        const profileData = await profileService.getUserProfile()
        console.log(profileData)
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
  
  if (user && !profile) return <Loading />

  return (
    <>
    {user && profile
      && 
    <NavBar 
      user={user} 
      profile={profile}
      handleLogout={handleLogout} 
    />
    }
    <Routes>
      <Route path="/" element={
          <Landing user={user}/>
        }
      />
      <Route path="/dashboard" 
        element={
          profile &&
          <ProtectedRoute user={user}>
            <Dashboard 
              profile={profile}
            />
          </ProtectedRoute>
        }
      />
      <Route path="/transactions" 
        element={
          profile && 
          <ProtectedRoute user={user}>
            <Transactions
              setProfile={setProfile}
              profile={profile}
            />
          </ProtectedRoute>
        }
      />
      <Route path="/schema" 
        element={
          profile && 
          <ProtectedRoute user={user}>
            <Schema
              setProfile={setProfile}
              profile={profile}
            />
          </ProtectedRoute>
        }
      />
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
