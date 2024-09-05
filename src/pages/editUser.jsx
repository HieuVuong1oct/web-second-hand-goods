import { Helmet } from 'react-helmet-async'

import EditUserView from 'src/layouts/admin/userAction/editUser/editUser'

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