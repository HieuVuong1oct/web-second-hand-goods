import { Helmet } from 'react-helmet-async'

import AllProductsPage from 'src/sections/home/viewAllProducts/viewAllProducts'

export default function ViewAllProductPage() {
  return (
    <>
      <Helmet>
        <title> ViewAll | Minimal UI </title>
      </Helmet>

      <AllProductsPage />
    </>
  )
}