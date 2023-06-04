// npm modules
import { Link } from 'react-router-dom';

// css
import styles from './Landing.module.css'

const Landing = (): JSX.Element => {

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
