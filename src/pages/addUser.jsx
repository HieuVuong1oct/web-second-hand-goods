import { Helmet } from 'react-helmet-async'

import AddUserView from 'src/sections/user/addUser/addUser'

export default function AddUserPage() {
  return (
    <>
      <Helmet>
        <title> AddUser | Minimal UI </title>
      </Helmet>

      <AddUserView />
    </>
  )
}