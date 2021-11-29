export interface IUser {
    id: string;
    name: string;
    pwd: string;
    profile_url: string;
  }
  
export interface IUserInputDTO {
  id: string;
  pwd: string;
}