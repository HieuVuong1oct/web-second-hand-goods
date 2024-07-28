import { Helmet } from 'react-helmet-async'

import { HomePageView } from 'src/sections/homePage'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> HomePage | Minimal UI </title>
      </Helmet>

      <HomePageView />
    </>
  )
}