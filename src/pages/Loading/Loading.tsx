// assets
import logo from '../../assets/images/logo.svg'

// css
import styles from './Loading.module.css'

const Loading = () => {

  return (
    <main className={styles.container}>
      <img src={logo} alt="Savvier logo" />
      <div></div>
      <h1>Loading...</h1>
    </main>
  )
}
 
export default Loading