// css
import styles from './Dashboard.module.css'

// types
import { Profile } from '../../types/models';
import TopNav from '../../components/PageHeader/PageHeader';

interface DashboardProps {
  profile: Profile;
}

const Dashboard = (props: DashboardProps) => {
  const { profile } = props

  return (
    <main className={styles.container}>
      <TopNav pageName='Dashboard'></TopNav>
    </main>
  )
}
 
export default Dashboard