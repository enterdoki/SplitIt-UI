export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const firstNameValidator = firstName => {
  if (!firstName || firstName.length <= 0) return 'First Name cannot be empty.';

  return '';
};

export const lastNameValidator = lastName => {
  if (!lastName || lastName.length <= 0) return 'Last Name cannot be empty.';

  return '';
};
