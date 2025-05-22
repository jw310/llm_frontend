// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';

import CreateUserForm from '@/components/form/CreateUserForm.jsx';

import { cn } from '@/utils/clsx.js';

function CreateUserPage() {
  // const { t } = useTranslation();

  return (
    <div className={cn('flex items-center justify-center pt-10')}>
      <CreateUserForm />
    </div>
  );
}

export default CreateUserPage;