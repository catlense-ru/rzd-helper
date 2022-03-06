export default interface IUser {
  uid: number,
  name: string,
  surname: string,
  login: string,
  work: string,
  password?: string,
  stat?: [string],
  permissions: string,
  contact: string,
  token?: string
}