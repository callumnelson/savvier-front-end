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
  profile: Profile | null;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, profile, handleLogout } = props
  
  return (
    <nav className={styles.container}>
      <img src={profile?.photo ?? defaultProfile } alt="" />
      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
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
