import { z } from 'zod';

export const FORM_MESSAGES = {
  REQUIRED_CATEGORY: '카테고리는 필수 선택 항목입니다.',
  REQUIRED_TITLE: '제목은 필수 입력 항목입니다.',
  REQUIRED_DESCRIPTION: '설명은 필수 입력 항목입니다.',
  REQUIRED_CONTENT: '내용은 필수 입력 항목입니다.',
  SUCCESS_CREATE: '예제 등록이 완료되었습니다.',
  SUCCESS_UPDATE: '예제 수정이 완료되었습니다.',
  ERROR_SAVE: '예제 저장에 실패했습니다.',
  SUCCESS_DELETE: '예제 삭제가 완료되었습니다.',
  ERROR_DELETE: '예제 삭제에 실패했습니다.',
};

export const formSchema = z.object({
  type: z.string().min(1, { message: FORM_MESSAGES.REQUIRED_CATEGORY }),
  title: z.string().min(1, { message: FORM_MESSAGES.REQUIRED_TITLE }),
  description: z
    .string()
    .min(1, { message: FORM_MESSAGES.REQUIRED_DESCRIPTION }),
  content: z
    .string()
    .trim()
    .min(1, { message: FORM_MESSAGES.REQUIRED_CONTENT }),
  thumbnail: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

// form 로그인페이지하고 비교하기
