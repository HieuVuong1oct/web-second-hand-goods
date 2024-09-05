import { Helmet } from 'react-helmet-async';

import EditProductView from 'src/layouts/products/editProduct/editProduct';

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