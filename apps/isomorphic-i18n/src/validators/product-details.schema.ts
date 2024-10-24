import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
// const imageFileSchema = z.instanceof(File)
//   .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'File size should be less than 5MB' })
//   .refine((file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type), { message: 'Only JPEG, PNG, or GIF files are allowed' });
const imageFileSchema = z.instanceof(File).optional();

export const productDetailsSchema = z.object({

  // Date Fields
  birthDay: z.string().nonempty("تاريخ الميلاد مطلوب"),
  enterexpectNumber: z.string().nonempty("تاريخ الدخول المتوقع مطلوب"),
  exitNumber: z.string().nonempty("تاريخ الخروج المتوقع مطلوب"),

  // Radio Fields
  LicenseClass: z.string().nonempty("فئة الرخصة مطلوبة"),
  ExtraDriver: z.string().nonempty("السائق الإضافي مطلوب"),
  personType: z.string().nonempty("نوع الشخص مطلوب"),
  selectLicenseCategory: z.string().nonempty("فئة الترخيص مطلوب"),

  // Select Fields
  blood: z.string().nonempty("فصيله الدم مطلوب"),
  enterNumber: z.string().nonempty("عدد مرات الدخول مطلوب"),
  status: z.string().nonempty("الحالة الإجتماعية مطلوبة"),
  stateResidence: z.string().nonempty("دولة الإقامة مطلوبة"),
  localLicenseSource: z.string().nonempty("مصدر رخصة القيادة المحلية مطلوبة"),
  nationality: z.string().nonempty("الجنسية مطلوبة"),
  operatingSystemType: z.string().nonempty("نوع نظام التشغيل مطلوبة"),
  dataSize: z.string().nonempty("حجم البيانات مطلوبة"),

  // Image Upload Fields
  passportImage: z.string().nonempty("صورة جواز السفر مطلوبة"),
  passportImage2: z.string().nonempty("صوره جواز السفر مطلوبة"),
  internationalDrivingLicence: z.string().nonempty("رخصة القيادة الدولية مطلوبة"),
  personalPhoto: z.string().nonempty("الصورة الشخصية مطلوبة"),
  passportNumberImage: z.string().nonempty("رقم جواز السفر مطلوبة"),
  imageValuepassportImage: imageFileSchema,
  imageValuepassportImage2: imageFileSchema,
  imageValueinternationalDrivingLicence: imageFileSchema,
  imageValuepersonalPhoto: imageFileSchema,
  imageValuepassportNumberImage: imageFileSchema,

  // Text Fields
  fullPersonName: z.string().nonempty("الاسم الكامل مطلوب"),
  passport: z.string().nonempty("رقم جواز السفر مطلوب"),
  IDNumber: z.string().nonempty("رقم الهوية مطلوب"),
  Address: z.string().nonempty("العنوان مطلوب"),
  
  // Phone Number Fields
  phoneNumber: z.string().nonempty("رقم الهاتف مطلوب"),
  
  // Optional Field for unsupported types
  none: z.string().optional(),
});

// generate form types from zod validation schema
export type ProductDetailsInput = z.infer<typeof productDetailsSchema>;