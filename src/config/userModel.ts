export interface UserAttribute {
  fullName: string,
  email: string,
  password: string,
  dob: string,
}

export interface UserParamAttribute {
  id: number,
}

export interface UserActivateAttribute {
  confirmationCode: string
}

export interface UserPassResetAttribute {
  email: string,
  confirmationCode: string,
  password: string,
  passwordResetCode: string,
}

// export interface UserPreferenceAttribute {
//   id: number,
// }

export interface UserHeaderAttribute {
  Authorization: string
}