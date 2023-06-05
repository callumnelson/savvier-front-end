// css
import { Account } from '../../types/models';
import styles from './SubNav.module.css'

// types
interface SubNavProps {
  accounts: Account[];
  selectedAccount: number | undefined;
  handleAccountClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

const SubNav = (props: SubNavProps) => {
  const { accounts, selectedAccount, handleAccountClick } = props

  return (
    <div className={styles.container}>
      <div>
        <h3>Accounts ({accounts?.length})</h3>
      </div>
      {accounts.map(acc => (
        <div 
          key={acc.id}
          id={acc.id.toString()}
          className={selectedAccount === acc.id ? styles.selected : ''}
          onClick={handleAccountClick}
        >
          <h4>{acc.name}</h4>
          <p>{acc.type}</p>
        </div>
      ))}
    </div>
  )
}
 
export default SubNav