export interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

export interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
