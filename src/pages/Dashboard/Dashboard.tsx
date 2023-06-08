// css
import styles from './Dashboard.module.css'

// components
import OverallTrendChart from '../../components/OverallTrendChart/OverallTrendChart';

// types
import { Profile } from '../../types/models';
import TopNav from '../../components/PageHeader/PageHeader';
import DashSubNav from '../../components/DashSubNav/DashSubNav';
import { useState } from 'react';
import { Chart } from '../../types/data';

// data
import { charts } from '../../data/charts';
import CategoryChart from '../../components/CategoryChart/CategoryChart';


interface DashboardProps {
  profile: Profile;
}

const Dashboard = (props: DashboardProps) => {
  const { profile } = props
  const [selectedChart, setSelectedChart] = useState<Chart>({
    name: 'Overall',
    type: 'Monthly Trends',
    id: 1,
  })

  const handleChartClick = (evt: React.MouseEvent<HTMLDivElement>): void => {
    const newSelectedChartId = parseInt(evt.currentTarget.id)
    setSelectedChart(charts[newSelectedChartId - 1])
  }

  return (
    <main className={styles.container}>
      <TopNav pageName='Dashboard'></TopNav>
      <section>
        <DashSubNav
          selectedChart={selectedChart}
          handleChartClick={handleChartClick}
        ></DashSubNav>
        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            {
              selectedChart.id === 1 &&
              <OverallTrendChart
                profile={profile}
              />
            }
            {
              selectedChart.id === 2 &&
              <CategoryChart
                profile={profile}
              />
            }
          </div>
        </div>
      </section>
    </main>
  )
}
 
export default Dashboard