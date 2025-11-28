import { z } from 'zod';

export const formSchema = z
  .object({
    nickname: z
      .string()
      .min(1, { message: '닉네임을 입력해주세요.' })
      .regex(/^\S+$/, { message: '닉네임에 공백을 포함할 수 없습니다.' }),
    email: z
      .string()
      .email({ message: '유효하지 않은 이메일 주소입니다.' })
      .refine(email => email.endsWith('@gmail.com'), {
        message: '인증 정책상 Gmail(@gmail.com) 주소만 지원하고 있습니다.',
      }),
    verifyCode: z.string().optional(),
    password: z
      .string()
      .min(6, { message: '비밀번호는 6자 이상이어야 합니다.' })
      .max(20, { message: '비밀번호는 20자 이하이어야 합니다.' })
      .regex(/[A-Za-z]/, { message: '영문자를 포함해야 합니다.' })
      .regex(/\d/, { message: '숫자를 포함해야 합니다.' }),
    confirmPassword: z.string().min(1, { message: '비밀번호를 확인해주세요.' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type FormValues = z.infer<typeof formSchema>;
