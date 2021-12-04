module.exports = {
  //최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)
  isTest: (nickname) => {
    if (!/^[A-za-z0-9]{3,15}$/g.test(nickname)) {
      return false;
    }
    return true;
  },

  //최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패
  isTest: (password) => {
    const nickname = "23hh";

    if (password.length < 4 || password.includes(nickname)) {
      return false;
    }
    return true;
  },

  //비밀번호 확인은 비밀번호와 정확하게 일치해야 합니다.
  isTest: (confirmPassword) => {
    const password1 = "hyeop";

    if (password1 !== confirmPassword) {
      return false;
    }
    return true;
  },

  //데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우
  // "중복된 닉네임입니다." 라는 에러메세지가 발생합니다.
  isTest: (dbNickname) => {
    const myNickname = "admin";

    if (dbNickname === myNickname) {
      return false;
    }
    return true;
  },
};
