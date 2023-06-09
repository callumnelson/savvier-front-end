// npm modules
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// css
import styles from './ChangePassword.module.css'

// types
import { AuthPageProps } from '../../types/props'
import { ChangePasswordFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'
import TopNav from '../../components/PageHeader/PageHeader'


const ChangePassword = (props: AuthPageProps): JSX.Element => {
  const { handleAuthEvt } = props
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState<ChangePasswordFormData>({
    curPassword: '',
    newPassword: '',
    newPasswordConf: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await authService.changePassword(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
    }
  }

  const { curPassword, newPassword, newPasswordConf } = formData

  const isFormInvalid = (): boolean => {
    return !(curPassword && newPassword && newPassword === newPasswordConf)
  }

  return (
    <main className={styles.container}>
      <TopNav pageName='Change Password'></TopNav>
      <p className={styles.message}>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Current Password
          <input
            type="password"
            value={curPassword}
            name="curPassword"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          New Password
          <input
            type="password"
            value={newPassword}
            name="newPassword"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Confirm New Password
          <input
            type="password"
            value={newPasswordConf}
            name="newPasswordConf"
            onChange={handleChange}
          />
        </label>
        <div>
          <button onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
          <button className={styles.button} disabled={isFormInvalid()}>
            Change Password
          </button>
        </div>
      </form>
    </main>
  )
}

export default ChangePassword
