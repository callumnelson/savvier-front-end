// css
import styles from './Dashboard.module.css'

// components
import OverallTrendChart from '../../components/OverallTrendChart/OverallTrendChart';

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
      <section>
        <div className={styles.trendchart}>
          <OverallTrendChart
            profile={profile}
          />
        </div>
      </section>
    </main>
  )
}
 
export default Dashboard