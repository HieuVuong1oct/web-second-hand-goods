import { Helmet } from 'react-helmet-async'

import { ResetPasswordView } from 'src/sections/resetPassword'

export default function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title> ForgotPassword | Minimal UI </title>
      </Helmet>

      <ResetPasswordView />
    </>
  )
}
