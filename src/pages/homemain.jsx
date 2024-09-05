import { Helmet } from 'react-helmet-async'

import { HomeMainView } from 'src/layouts/user/home'

export default function HomeMainPage() {
  return (
    <>
      <Helmet>
        <title> HomeMain | Minimal UI </title>
      </Helmet>

      <HomeMainView />
    </>
  )
}
