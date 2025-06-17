import { useContext, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import {
  PlusCircleIcon,
  ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import pdfIcon from '@/assets/pdf.png';
import Alert from '../modal/Alert';

// import { deleteUploadFileApi } from '@/api/api';
import { AuthContext } from '@/context/auth';

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

function getExtension(filename) {
  return filename.match(/\.([^.]+)$/)?.[1];
}

function FileUploadBtn({
  register,
  employeeId,
  onChange,
  name,
  defaultData,
  max,
}) {
  const maxFiles = max;
  const { logout } = useContext(AuthContext);
  const [editableDefaultData, setEditableDefaultData] = useState(defaultData);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedFormData, setUploadedFormData] = useState([]);
  const uploadInput = useRef(null);
  const uploadFormDataRef = useRef(new FormData());

  const [showAlert, setShowAlert] = useState({
    type: '',
    message: '',
    isShow: false,
  });

  // const { mutateAsync } = useMutation({
  //   mutationFn: deleteUploadFileApi,
  // });

  const handleUploadClick = () => {
    //檢查檔案數量
    const defaultFileCount = editableDefaultData?.length || 0;
    const uploadedFileCount = uploadedFiles.length || 0;
    const totalFileCount = defaultFileCount + uploadedFileCount;

    if (totalFileCount >= maxFiles) {
      setShowAlert((prev) => ({
        type: 'error',
        message: `檔案太多，最多只能上傳${maxFiles}個檔案`,
        isShow: !prev.isShow,
      }));
      // console.log(`檔案太多，最多只能上傳${maxFiles}個檔案`);
      return;
    }
    uploadInput.current.click();
  };

  const handleDeleteFileClick = async (id) => {
    const deletePayload = {
      fileId: id,
    };

    try {
      const result = await mutateAsync({ payload: deletePayload, employeeId });

      setShowAlert((prev) => ({
        type: 'success',
        message: `success`,
        isShow: !prev.isShow,
      }));

      setEditableDefaultData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Delete File failed:', error);
      setShowAlert((prev) => ({
        type: 'error',
        message: 'Delete File failed',
        isShow: !prev.isShow,
      }));

      if (error.message === 'Unauthorized') {
        setTimeout(() => {
          logout();
        }, 2000);
      }
    }
  };

  const handleRemoveFileClick = (index) => {
    //重置formData物件
    uploadFormDataRef.current = new FormData();
    //準備上傳的檔案刪除，顯示用
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    //準備上傳的formData中移除不需要的檔案並重新append
    const newFormDataArray = uploadedFormData.filter((_, i) => i !== index);
    setUploadedFormData(newFormDataArray);

    if (newFormDataArray.length === 0) {
      return onChange(null);
    }

    newFormDataArray.forEach((item) => {
      uploadFormDataRef.current.append('files', item);
    });

    //將formData傳遞給onChange
    onChange(uploadFormDataRef.current);
  };

  const handleUpload = (event) => {
    // 如果沒有選擇檔案，就不做任何事情
    if (event.target.files.length === 0) return;

    // 將檔案物件轉成陣列
    const filesArray = Array.from(event.target.files);

    // 計算檔案總數
    const defaultFileCount = editableDefaultData?.length || 0;
    const uploadedFileCount = uploadedFiles?.length || 0;
    const uploadingFileCount = filesArray.length;
    const totalFileCount =
      defaultFileCount + uploadedFileCount + uploadingFileCount;

    // 檢查檔案總量
    if (totalFileCount > maxFiles) {
      setShowAlert((prev) => ({
        type: 'error',
        message: `檔案太多，最多只能上傳${maxFiles}個檔案`,
        isShow: !prev.isShow,
      }));
      return;
    }

    for (let i = 0; i < filesArray.length; i++) {
      // 現在準備上傳的檔案整理成需要的格式，顯示用
      const fileURL = URL.createObjectURL(filesArray[i]);
      const fileObj = {
        name: filesArray[i].name,
        type: filesArray[i].type,
        url: fileURL,
      };
      setUploadedFiles((prev) => {
        return [...prev, fileObj];
      });

      // 現在準備上傳的formData儲存在state中
      setUploadedFormData((prev) => [...prev, filesArray[i]]);
      // 現在準備上傳的formData append到useRef裡的formData
      uploadFormDataRef.current.append('files', filesArray[i]);
    }
    //將formData傳遞給onChange
    onChange(uploadFormDataRef.current);
  };

  let inputContent;

  if (name === 'attachments') {
    inputContent = (
      <input
        {...register('attachments', {
          required: false,
        })}
        id='file-uploader'
        ref={uploadInput}
        type='file'
        accept='.png, .jpg, .jpeg, .pdf'
        multiple
        onChange={handleUpload}
        hidden
      />
    );
  } else if (name === 'attachment') {
    inputContent = (
      <input
        {...register('attachment', {
          required: false,
        })}
        id='file-uploader'
        ref={uploadInput}
        type='file'
        accept='.png, .jpg, .jpeg, .pdf'
        onChange={handleUpload}
        hidden
      />
    );
  }

  return (
    <>
      {inputContent}
      {editableDefaultData?.map((attach) => (
        <div key={attach.id} className='relative flex h-fit w-16 flex-col'>
          <a
            className='h-fit w-fit cursor-pointer'
            href={`${IMAGE_BASE_URL}${attach.path}`}
            target='_blank'
          >
            <img
              src={
                getExtension(attach.path) === 'pdf'
                  ? pdfIcon
                  : `${IMAGE_BASE_URL}${attach.path}`
              }
              alt={`file${attach.id}`}
              className='h-16 w-16 object-cover'
            />
          </a>
          <p className='w-full truncate text-xs'>{attach.name}</p>
          <div
            className='absolute -top-2 -left-2 h-fit w-fit cursor-pointer rounded-full bg-red-600'
            onClick={() => handleDeleteFileClick(attach.id)}
          >
            <XMarkIcon className='h-4 w-4 text-white' />
          </div>
        </div>
      ))}
      {uploadedFiles?.map((file, index) => (
        <div key={index} className='relative flex h-fit w-16 flex-col'>
          <a
            className='h-fit w-fit cursor-pointer'
            href={file.url}
            target='_blank'
          >
            <img
              src={file.type === 'application/pdf' ? pdfIcon : file.url}
              alt={`file${index}`}
              className='h-16 w-16 object-cover'
            />
          </a>
          <p className='w-full truncate text-xs'>{file.name}</p>
          <div
            className='absolute -top-2 -left-2 h-fit w-fit cursor-pointer rounded-full bg-red-600'
            onClick={() => handleRemoveFileClick(index)}
          >
            <XMarkIcon className='h-4 w-4 text-white' />
          </div>
        </div>
      ))}
      <button
        type='button'
        onClick={handleUploadClick}
        className='flex h-fit w-fit cursor-pointer items-center justify-between gap-2 rounded-md bg-indigo-300 px-7 py-2 text-lg hover:bg-indigo-600 hover:text-white'
      >
        <ArrowUpOnSquareIcon className='h-6 w-6' />
        檔案上傳
      </button>
      {showAlert.isShow && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}
    </>
  );
}

export default FileUploadBtn;
