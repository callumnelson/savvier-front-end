// npm modules
import { useNavigate } from 'react-router-dom'

// css
import styles from './Landing.module.css'

// assets
import logo from '../../assets/images/logo.svg'

// types
import { User } from '../../types/models';
import { useEffect } from 'react';

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/dashboard')
  }, [user]);

  return (
    <main className={styles.container}>
      <img src={logo} alt="Savvier logo" />
      <h1>Get savvier. Become a saver.</h1>
      <div>
        <button onClick={() => navigate('/auth/signup')}>
          Signup
        </button>
        <button onClick={() => navigate('/auth/login')}>
          Login
        </button>
      </div>
    </main>
  )
}

export default Landing
