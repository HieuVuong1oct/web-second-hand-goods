import { Helmet } from 'react-helmet-async'

import { AddProductView } from 'src/layouts/products/view/addProduct'

export default function AddProductPage() {
  return (
    <>
      <Helmet>
        <title> AddProductPage | Minimal UI </title>
      </Helmet>

      <AddProductView />
    </>
  )
}