const passwordValidation = {
  hasNumber: (v: string) =>
    /\d+/g.test(v) || '비밀번호에 숫자 1개 이상은 필수입니다',
  hasUppercase: (v: string) =>
    /[A-Z]+/g.test(v) || '비밀번호에 영어 대문자 1개 이상은 필수입니다',
  hasLowercase: (v: string) =>
    /[a-z]+/g.test(v) || '비밀번호에 영어 소문자 1개 이상은 필수입니다',
  hasSpecialCharacter: (v: string) =>
    /[!@#$%^&*()]+/g.test(v) || '비밀번호에 특수문자 1개 이상은 필수입니다',
};

export default passwordValidation;
