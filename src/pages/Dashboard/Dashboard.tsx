// css
import styles from './Dashboard.module.css'

// types
import { Profile } from '../../types/models';
import TopNav from '../../components/PageHeader/PageHeader';

interface DashboardProps {
  profile: Profile | null;
}

const Dashboard = (props: DashboardProps) => {
  const { profile } = props

  if (!profile) return <h1>Loading...</h1>

  return (
    <main className={styles.container}>
      <TopNav pageName='Dashboard'></TopNav>
    </main>
  )
}
 
export default Dashboard