// npm modules
import { NavLink, useLocation } from 'react-router-dom'

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
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, profile, handleLogout, hidden, setHidden} = props
  const { pathname } = useLocation()
  const navPath = pathname.split('/').slice(-1)[0].replaceAll('-', ' ')
  
  return (
    <nav 
      className={styles.container}
      style={{minWidth: hidden ? '60px': '210px'}}  
    >
      <div
        onClick={() => setHidden(!hidden)}
        style={{justifyContent: hidden ? 'center' : 'end'}}
      >
        {hidden ? "-->" : "<--"}
      </div>
      <section className={hidden ? styles.hideNav : styles.showNav}>
        <div className={styles.info}>
          <img src={profile.photo ?? defaultProfile } alt="" />
          <h1>{user.name.split(' ')[0]}</h1>
        </div>
        <div className={styles.destinations}>
          <p className={navPath === 'dashboard' ? styles.selected: styles.unselected}>
            <NavLink to="/dashboard">Insights</NavLink>
          </p>
          {/* <p className={navPath === 'goals' ? styles.selected: styles.unselected}>
            <NavLink to="/goals">Goals</NavLink>
          </p> */}
          <p className={navPath === 'transactions' ? styles.selected: styles.unselected}>
            <NavLink to="/transactions">Transactions</NavLink>
          </p>
          <p className={navPath === 'schema' ? styles.selected: styles.unselected}>
            <NavLink to="/schema">Schema</NavLink>
          </p>
        </div>
        <div className={styles.auth}>
          <p className={navPath === 'change password' ? styles.selected: styles.unselected}>
            <NavLink to="/auth/change-password">Change Password</NavLink>
          </p>
          <p className={navPath === 'log out' ? styles.selected: styles.unselected}>
            <NavLink to="" onClick={handleLogout}>Log Out</NavLink>
          </p>
        </div>
      </section>
    </nav>
  )
}

export default NavBar
