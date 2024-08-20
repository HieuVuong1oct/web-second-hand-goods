
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'

export default function Account() {
  const [account, setAccount] = useState({
    displayName: '',
    email: '',
    photoURL: '/assets/images/avatars/avatar_25.jpg',
  })

  useEffect(() => {
    const username = Cookies.get('username')
    const email = Cookies.get('email')
    const avatar = Cookies.get('avatar')
    setAccount({
      displayName: username || '',
      email: email || '',
      photoURL: JSON.parse(avatar),
    })
  }, [])

  return account
}
