export interface KnownError {
  message: string;
}

export interface ResponsePayloadError {
  rejectValue: KnownError;
}