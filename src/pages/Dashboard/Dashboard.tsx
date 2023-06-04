// css
import styles from './Dashboard.module.css'

// types
import { Profile, User } from '../../types/models';

interface DashboardProps {
  user: User | null;
}

const Dashboard = (props: DashboardProps) => {
  const { user } = props

  return (
    <div className={styles.container}>
      <h1>Hello, {user?.name}</h1>
      <h1>Dashboard goes here</h1>
    </div>
  )
}
 
export default Dashboard