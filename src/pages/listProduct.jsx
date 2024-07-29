import { Helmet } from 'react-helmet-async';

import ListProductView from 'src/sections/home/listProduct/listProduct';

export default function ListProductPage() {
  return (
    <>
      <Helmet>
        <title> ContentProductView | Minimal UI </title>
      </Helmet>

      <ListProductView />
    </>
  );
}