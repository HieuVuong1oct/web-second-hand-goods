import { Helmet } from 'react-helmet-async'

import EditUserView from 'src/sections/user/editUser/editUser'

export default function EditUserPage() {
  return (
    <>
      <Helmet>
        <title> EditUser | Minimal UI </title>
      </Helmet>

      <EditUserView />
    </>
  )
}