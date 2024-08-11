import { Helmet } from 'react-helmet-async';

import ContentProductDetailView from 'src/sections/home/contentProductDetail/contentProductDetail';

export default function ContentProductDetailPage() {
  return (
    <>
      <Helmet>
        <title> ContentProductDetailView | Minimal UI </title>
      </Helmet>

      <ContentProductDetailView />
    </>
  );
}