// npm modules
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

// types
import { User } from '../../types/models'

interface ProtectedRouteProps {
  user: User | null;
  children: ReactNode;
}

const ProtectedRoute = (props: ProtectedRouteProps): JSX.Element => {
  const { user, children } = props
  const navigate = useNavigate()

  console.log(user)

  if (!user) navigate('/auth/login')
  return <> { children } </>
}

export default ProtectedRoute
