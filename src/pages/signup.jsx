import { Helmet } from 'react-helmet-async'

import { SignUpView } from 'src/layouts/auth/signup'

export default function SignUpPage() {
  return (
    <>
      <Helmet>
        <title> SignUp | Minimal UI </title>
      </Helmet>

      <SignUpView />
    </>
  )
}
