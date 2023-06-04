// npm modules
import { Link } from 'react-router-dom';

// css
import styles from './Landing.module.css'

// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className={styles.container}>
      <h1>LOGO GOES HERE</h1>
      <div>
        <Link to={'/auth/signup'}>Signup</Link>
        <span> or </span>
        <Link to={'/auth/login'}>Login</Link>
      </div>
    </main>
  )
}

export default Landing
