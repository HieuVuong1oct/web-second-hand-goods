import { Helmet } from 'react-helmet-async'

import { ForgotPasswordView } from 'src/layouts/forgotPassword'

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> ForgotPassword | Minimal UI </title>
      </Helmet>

      <ForgotPasswordView />
    </>
  )
}
