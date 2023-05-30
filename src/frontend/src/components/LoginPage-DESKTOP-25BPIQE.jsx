import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import PageHero from './PageHero'

const LoginPage = () => {

  const { login } = useAuthContext()
  const navigate = useNavigate()

  const onLogin = () => {

    login('manolo')

    navigate('/', {
      replace: true
    })
  }

  return (
    <div className="d-flex flex-wrap">
      <PageHero title="Login Page" />

    <button
    onClick={onLogin}
    >
      login
    </button>
    </div>
  )
}

export default LoginPage