export interface ContactProps {
  name: string;
  phone: number;
  next: null | ContactProps;
}

export interface Grouping {
  head: null | ContactProps;
  tail: null | ContactProps;
  next: null | ContactProps;
}
