export interface AuthResponseData {
  email: string,
  expiresIn: string,
  idToken: string,
  kind: string,
  localId: string
  refreshToken: string,
  registered?: boolean
}

export type LocalStorageUser = {
  email: string,
  id: string,
  _token: string,
  _tokenExpirationDate: string
};
