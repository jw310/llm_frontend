import { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SelectBtn from '@/components/button/SelectBtn.jsx';
import Alert from '../modal/Alert';
import { AuthContext } from '@/context/authContext';
import { trimString } from '@/util/index.jsx';
import useCustomMutation from '@/hooks/useCustomMutation.jsx';
import {
  createChatbotKnowledgeApi,
  updateChatbotKnowledgeApi,
} from '@/api/api';
import { Spinner } from '@/components/Spinner.jsx';

function KnowledgeEditForm({ knowledgeDataById, knowledgeId }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showAlert } = useContext(AuthContext);

  const knowledgeOptions = [
    {
      value: 'test',
      label: 'test',
    },
    {
      value: 'test2',
      label: 'test2',
    },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      topic: knowledgeDataById?.topic || null,
      weight: knowledgeDataById?.weight || null,
      content: knowledgeDataById?.content || null,
    },
  });

  const { mutate, isPending } = useCustomMutation({
    mutationFn:
      knowledgeId !== undefined
        ? updateChatbotKnowledgeApi
        : createChatbotKnowledgeApi,
    options: {
      successMessage: t('knowledge.setSuccess'),
      errorMessage: t('knowledge.setFail'),
      refreshDataFn: () => navigate('/basic/setting/knowledge/manage'),
    },
  });

  const handleReturnClick = () => {
    return navigate(`/basic/setting/knowledge/manage`);
  };

  const onSubmit = async (data) => {
    let submissionData = {};

    submissionData = {
      topic: trimString(data.topic),
      weight: data.weight,
      content: trimString(data.content),
    };

    if (knowledgeId !== undefined) {
      return mutate({ payload: submissionData, id: knowledgeId });
    }

    mutate(submissionData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex h-fit w-full flex-col gap-5'>
        {/* knowledgeType */}
        {/* <div className='flex h-fit w-full flex-col gap-2'>
          <label className='flex-shrink-0 text-base'>
            *{t('knowledge.knowledge')}：
          </label>
          <Controller
            control={control}
            name='knowledgeType'
            rules={{
              required: { value: true, message: t('errorMessage.required') },
            }}
            render={({ field: { onChange, value } }) => (
              <SelectBtn
                onChange={onChange}
                options={knowledgeOptions}
                value={value}
                customStyle='focus:none h-11 w-full rounded border-2 border-grey-500 bg-grey-700 text-white focus:outline-none'
                placeholder={t('knowledge.knowledgePlaceholder')}
              />
            )}
          />
          {errors?.knowledgeType?.type && (
            <p className='whitespace-nowrap text-red-500'>
              {errors?.knowledgeType?.message}
            </p>
          )}
        </div> */}
        {/* theme */}
        <div className='flex h-fit w-full flex-col gap-2'>
          <label className='flex-shrink-0 text-base' htmlFor='topic'>
            <span>*</span>
            {t('knowledge.topic')}：
          </label>
          <input
            {...register('topic', {
              required: { value: true, message: t('errorMessage.required') },
            })}
            type='text'
            id='topic'
            placeholder={t('knowledge.topicPlaceholder')}
            className={`focus:none h-11 w-full rounded border-2 ${errors?.topic ? 'border-red-500' : 'border-grey-500'} bg-grey-700 indent-3 text-white focus:outline-none`}
          />
          {errors?.topic?.type && (
            <p className='whitespace-nowrap text-red-500'>
              {errors?.topic?.message}
            </p>
          )}
        </div>
        {/* weight */}
        <div className='flex h-fit w-full flex-col gap-2'>
          <label className='flex-shrink-0 text-base' htmlFor='weight'>
            <span>*</span>
            {t('knowledge.weight')}：
          </label>
          <input
            {...register('weight', {
              required: { value: true, message: t('errorMessage.required') },
              pattern: {
                value: /^([0-9]|[1-9][0-9])$/,
                message: t('errorMessage.weight'),
              },
            })}
            type='text'
            id='weight'
            placeholder={t('knowledge.weightPlaceholder')}
            className={`focus:none h-11 w-full rounded border-2 ${errors?.weight ? 'border-red-500' : 'border-grey-500'} bg-grey-700 indent-3 text-white focus:outline-none`}
          />
          {errors?.weight?.type && (
            <p className='whitespace-nowrap text-red-500'>
              {errors?.weight?.message}
            </p>
          )}
        </div>
        {/* content */}
        <div className='flex h-fit w-full flex-col gap-2'>
          <label className='flex-shrink-0 text-base' htmlFor='content'>
            <span>*</span>
            {t('knowledge.content')}：
          </label>
          <textarea
            {...register('content', {
              required: { value: true, message: t('errorMessage.required') },
            })}
            type='text'
            id='content'
            rows={5}
            placeholder={t('knowledge.contentPlaceholder')}
            className={`focus:none h-[300px] w-full resize-none rounded border-2 ${errors?.content ? 'border-red-500' : 'border-grey-500'} bg-grey-700 px-3 py-2 text-white focus:outline-none`}
          />
          {errors?.content?.type && (
            <p className='whitespace-nowrap text-red-500'>
              {errors?.content?.message}
            </p>
          )}
        </div>
      </div>
      <div className='flex h-fit w-full items-center justify-center gap-5'>
        <button
          type='button'
          onClick={handleReturnClick}
          className='bg-grey-600 hover:bg-grey-300 hover:text-grey-600 mt-6 w-[52px] cursor-pointer rounded px-2 py-2 text-base text-white shadow-md'
        >
          {t('knowledge.cancel')}
        </button>
        <button
          className='mt-6 w-[52px] cursor-pointer rounded bg-blue-600 px-2 py-2 text-base text-white shadow-md hover:bg-blue-200 hover:text-blue-600'
          type='submit'
        >
          {t('knowledge.submit')}
        </button>
      </div>
      {showAlert.isShow && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}
      {isPending && <Spinner />}
    </form>
  );
}

export default KnowledgeEditForm;
