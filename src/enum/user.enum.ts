export const genderEnum = {
  MALE: 'Nam',
  FEMALE: 'Nữ'
} as const 

export type genderType = keyof typeof genderEnum;
