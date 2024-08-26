import { Helmet } from 'react-helmet-async';

import EditProductView from 'src/sections/products/view/editProduct/editProduct';

export default function EditProductViewPage() {
  return (
    <>
      <Helmet>
        <title> EditUserView | Minimal UI </title>
      </Helmet>

      <EditProductView />
    </>
  );
}