import { Helmet } from 'react-helmet-async'

import OrderManagement from 'src/layouts/admin/order/order'

export default function OrderPage() {
  return (
    <>
      <Helmet>
        <title> Order | Minimal UI </title>
      </Helmet>

      <OrderManagement />
    </>
  )
}