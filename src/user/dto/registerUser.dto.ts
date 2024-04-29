export class RegisterUserDto {
  // The readonly keyword is used to define a read-only property. Since dto classes are used to define the structure of the data that will be sent to the server, it is important to make sure that the data is not modified after it has been sent. This is why the readonly keyword is used.
  readonly username: string;
  readonly email: string;
  readonly password: string;
}
