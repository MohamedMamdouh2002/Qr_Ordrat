import * as yup from 'yup';
import { useTranslation } from '@/app/i18n/client';

const useLoginValidation = ({ lang }: { lang?: string }) => {
  const { t } = useTranslation(lang!, 'loginForm');

  const ContactValidation = yup.object({
    email: yup.string().email(t('emailInvalid')).required(t('emailRequired')),
    password: yup
      .string()
      .required(t('passwordRequired'))
      .matches(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$@%_&? "]).*/, {
        message: t('passwordInvalid')
      })
  });

  return ContactValidation;
};

const initialValues = {
  email: '',
  password: ''
};

export { useLoginValidation, initialValues as loginInitialValues };
