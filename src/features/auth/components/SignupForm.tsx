import { Loader2, Shuffle } from 'lucide-react';

import useSignupForm from '@/hooks/useSignupForm';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface SignupFormProps {
  onSuccess: () => void;
}

const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const {
    form,
    isEmailSent,
    isCodeSent,
    isVerified,
    isLoading,
    applyRandomNickname: handleRandomNickname,
    sendVerificationCode: handleSendVerificationCode,
    verifyEmailCode: handleVerifyEmailCode,
    onSubmit,
  } = useSignupForm({ onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6">
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-gray-300">
                  닉네임
                </FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input {...field} placeholder="닉네임" />
                  </FormControl>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleRandomNickname}
                  >
                    <Shuffle />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-gray-300">
                  이메일
                </FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="이메일을 입력해주세요."
                      disabled={isEmailSent}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleSendVerificationCode}
                    className="min-w-20"
                    disabled={isEmailSent}
                  >
                    {isCodeSent ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      '인증하기'
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {isEmailSent && !isVerified && (
            <div className="mt-2">
              <FormField
                control={form.control}
                name="verifyCode"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="인증번호를 입력해주세요."
                          disabled={isVerified}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleVerifyEmailCode}
                        className="min-w-20"
                        disabled={isVerified}
                      >
                        확인
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
        <div className="mb-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-gray-300">
                  비밀번호
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="영문자,숫자 포함 6~20자"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="비밀번호를 확인해 주세요."
                      type="password"
                      onBlur={async () => await form.trigger('confirmPassword')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <Button
            type="submit"
            className="gradient-background w-full"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 animate-spin" /> : 'Sign Up'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
