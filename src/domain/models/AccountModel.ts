export interface SignInDataModel {
  email: string
  password: string
}

export interface CreateAccountModel {
  email: string
  name: string
  birthday: string
  username: string
  password: string
}

export interface AccountModel {
  id: string
  email: string
  name: string
  birthday: string
  username: string
  password: string
}

export interface AuthenticateModel {
  id: string
  email: string
  name: string
  birthday: string
  username: string
}
