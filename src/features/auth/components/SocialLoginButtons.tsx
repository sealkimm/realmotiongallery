import { GithubIcon, GoogleIcon, KakaoIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

// useSocialLogin 훅에도 똑같이 정의 되어있음 공통으로 뺄건데, 어디에 두어야 하나??
type Provider = 'google' | 'github' | 'kakao';

interface SocialLoginButtonsProps {
  onClickSocialLogin: (provider: Provider) => void;
}

const SocialLoginButtons = ({
  onClickSocialLogin,
}: SocialLoginButtonsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="secondary"
        className="w-full"
        onClick={() => onClickSocialLogin('google')}
      >
        <GoogleIcon /> Google
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        onClick={() => onClickSocialLogin('github')}
      >
        <GithubIcon /> Github
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        onClick={() => onClickSocialLogin('kakao')}
      >
        <KakaoIcon /> Kakao
      </Button>
    </div>
  );
};
export default SocialLoginButtons;
