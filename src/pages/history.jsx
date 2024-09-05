import { Helmet } from 'react-helmet-async'

import HistoryScreen from 'src/layouts/user/history/history'

export default function HistoryPage() {
  return (
    <>
      <Helmet>
        <title> History | Minimal UI </title>
      </Helmet>

      <HistoryScreen />
    </>
  )
}
