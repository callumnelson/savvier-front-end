// npm modules
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

// css
import styles from './Landing.module.css'

// types
import { User } from '../../types/models';

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props
  const navigate = useNavigate()

  if (user) navigate('/dashboard')

  return (
    <main className={styles.container}>
      <h1>LOGO GOES HERE</h1>
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
