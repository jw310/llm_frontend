// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';

import CreateUserForm from '@/components/form/CreateUserForm.jsx';
import CrewEditForm from '@/components/form/CrewEditForm.jsx';
import InterfaceForm from '@/components/form/InterfaceForm.jsx';

import { cn } from '@/utils/clsx.js';

function CreateUserPage() {
  // const { t } = useTranslation();

  return (
    <div className={cn('flex w-full items-center justify-center py-[30px]')}>
      {/* <CreateUserForm /> */}
      {/* <CrewEditForm /> */}
      <InterfaceForm />
    </div>
  );
}

export default CreateUserPage;
