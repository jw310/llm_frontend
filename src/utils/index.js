export const showEmployeeStatus = (statusId) => {
  switch (statusId) {
    case 1:
      return '在職中';
    case 2:
      return '已離職';
    case 3:
      return '留停中';
    default:
      return '在職中';
  }
};

export const showApplyStatus = (statusId) => {
  switch (statusId) {
    case 1:
      return '簽核中';
    case 2:
      return '核准';
    case 3:
      return '拒絕';
    case 4:
      return '作廢';
    default:
      return '';
  }
};

export function extractPathname(url) {
  const parts = url.split('/');
  return parts.length > 1 ? `${parts[1]}` : '';
}