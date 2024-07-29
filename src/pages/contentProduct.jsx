import { Helmet } from 'react-helmet-async';

import ContentProductView from 'src/sections/home/contentProduct/contentProduct';

export default function ContentProductPage() {
  return (
    <>
      <Helmet>
        <title> ContentProductView | Minimal UI </title>
      </Helmet>

      <ContentProductView />
    </>
  );
}