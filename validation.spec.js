const { isTest } = require("./validation");

test('최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)', () => {
  expect(isTest("zxccz123")).toEqual(true);  //정상닉네임
  expect(isTest("ZXCCZ")).toEqual(true);  //대문자만
  expect(isTest("123333")).toEqual(true); //숫자만
  expect(isTest("ZXCcz123")).toEqual(true);  //대소문자 + 숫자
  
  expect(isTest("aa")).toEqual(false); //두글자
  expect(isTest("")).toEqual(false);    //공백
  expect(isTest("한글")).toEqual(false);    //한글
  expect(isTest("日本語")).toEqual(false);  //일본어

});

test("최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패", () => {
  expect(isTest("44444, zseqwe, awer123")).toEqual(true);

  expect(isTest("123")).toEqual(false);
  expect(isTest("23hh")).toEqual(false);
});

test("비밀번호 확인은 비밀번호와 정확하게 일치해야 합니다.", () => {
  expect(isTest("hyeop")).toEqual(true);


  expect(isTest("23333, aaa23")).toEqual(false);
  expect(isTest("qweqwe, asdasd")).toEqual(false);
});

test("db중복 체크", () => {
  expect(isTest("admin")).toEqual(false);

  expect(isTest("user")).toEqual(true);
});