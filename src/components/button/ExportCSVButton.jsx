import { cn } from '@/utils/clsx';

import { FolderArrowDownIcon } from '@heroicons/react/24/outline';

function ExportCSVButton({ data, fileName }) {
  if (!fileName) {
    fileName = `export_${new Date().toLocaleDateString()}.csv`;
  }

  const buildCSV = (data) => {
    let arrayData = [];
    return new Promise((resolve, reject) => {
      try {
        if (data.length === 0) {
          throw new Error('Array is empty');
        }

        // create header
        let header = Object.keys(data[0]);
        arrayData.push(header);

        // create data
        data.forEach((d) => {
          let items = [];
          header.forEach((title) => {
            const item = d[title] || '';
            items.push(item);
          });
          arrayData.push(items);
        });
      } catch (error) {
        reject(error);
      }
      resolve(arrayData);
    });
  };

  const downloadCSV = (csvData) => {
    let csvContent = '';
    csvData.forEach((item) => {
      let dataString = item.join(',') + '\n';
      csvContent += dataString;
    });

    // create a link and download it
    let blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8,\ufeff;',
    });
    let link = document.createElement('a');
    let url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      className={cn(
        'item-center flex justify-center rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-700',
        'cursor-pointer'
      )}
      onClick={() => {
        buildCSV(data)
          .then((res) => {
            downloadCSV(res);
          })
          .catch((error) => {
            console.error('Error building CSV:', error);
          });
      }}
    >
      {/* <FolderArrowDownIcon className={cn('h-6 w-6')} /> */}
      Export to CSV
    </button>
  );
}

export default ExportCSVButton;
