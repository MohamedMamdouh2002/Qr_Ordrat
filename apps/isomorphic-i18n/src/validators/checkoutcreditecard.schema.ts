import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const madeOrderSchema = z.object({
    refreshToken: z.string(),
    orderType: z.number(),
    chippingFees: z.number(), 
    addressId: z.string(),
    cardPayment: z.object({
        cardNumber: z.string().nonempty('Card number is required'),
        expireDate: z.string().nonempty('Expiration date is required'),
        cardCVC: z.string().nonempty('Card CVC is required'),
    }),
});

// generate form types from zod validation schema
export type MadeOrderInput = z.infer<typeof madeOrderSchema>;
