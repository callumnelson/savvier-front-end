// types
interface PageHeaderProps {
  pageName: string;
}

// css
import styles from './PageHeader.module.css'

const PageHeader = (props: PageHeaderProps) => {
  const { pageName } = props
  
  return (
    <div className={styles.container}>
      <h1>{pageName}</h1>
      <div className={styles.divider}></div>
    </div>
  )
}
 
export default PageHeader