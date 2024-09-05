import { Helmet } from 'react-helmet-async'

import { UserView } from 'src/layouts/admin/userAction/view'

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UserView />
    </>
  )
}
