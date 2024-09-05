import { Helmet } from 'react-helmet-async';

import ProductPage from 'src/layouts/user/home/content/content'

export default function ContentPage() {
  return (
    <>
      <Helmet>
        <title> Content | Minimal UI </title>
      </Helmet>

      <ProductPage />
    </>
  );
}