// npm modules
import { NavLink } from 'react-router-dom'

// assets
import defaultProfile from '../../assets/icons/profile.png'

// css
import styles from './NavBar.module.css'

// types
import { Profile, User } from '../../types/models'

interface NavBarProps {
  user: User;
  handleLogout: () => void;
  profile: Profile;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, profile, handleLogout } = props
  
  return (
    <nav className={styles.container}>
      <div className={styles.info}>
        <img src={profile?.photo ?? defaultProfile } alt="" />
        <h1>{user.name}</h1>
      </div>
      <ul className={styles.destinations}>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/transactions">Transactions</NavLink>
        </li>
        <li>
          <NavLink to="" onClick={handleLogout}>LOG OUT</NavLink>
        </li>
        <li>
          <NavLink to="/auth/change-password">Change Password</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
