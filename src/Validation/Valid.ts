export function isEmailInvalid(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(String(email).toLowerCase());
}

export function isPasswordInvalid(password) {
  const re = /(?=.*\d)(?=.*[A-ZА-ЯЁ])(?=.*[a-zа-яё]).{8,}/;
  return !re.test(String(password));
}
