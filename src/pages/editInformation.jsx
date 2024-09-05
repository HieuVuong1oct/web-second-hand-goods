import { Helmet } from 'react-helmet-async';

import EditInformationView from 'src/layouts/user/editInformation/editInformation';

export default function EditUserViewPage() {
  return (
    <>
      <Helmet>
        <title> EditUserView | Minimal UI </title>
      </Helmet>

      <EditInformationView />
    </>
  );
}