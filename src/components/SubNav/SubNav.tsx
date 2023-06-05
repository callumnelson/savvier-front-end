// css
import { Account } from '../../types/models';
import styles from './SubNav.module.css'

// types
interface SubNavProps {
  accounts?: Account[];
  selectedAccount: number | undefined;
}

const SubNav = (props: SubNavProps) => {
  const { accounts, selectedAccount } = props

  return (
    <div className={styles.container}>
      <div>
        <h3>Accounts ({accounts?.length})</h3>
      </div>
      {accounts?.map(acc => (
        <div key={acc.id}
          className={selectedAccount === acc.id ? styles.selected : ''}
        >
          <h4>{acc.name}</h4>
          <p>{acc.type}</p>
        </div>
      ))}
    </div>
  )
}
 
export default SubNav