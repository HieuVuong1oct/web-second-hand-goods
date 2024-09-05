import { Helmet } from 'react-helmet-async'

import { ProductsView } from 'src/layouts/products/view'

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <ProductsView />
    </>
  )
}
