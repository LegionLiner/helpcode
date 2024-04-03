export interface User {
  name: string;
  email: string;
  phone: string;
  website: string;
  about: string;
  password: string;
  preferences: string[];
  featured: Featured[];
  created_at: number;
  active: boolean;
}

export interface Featured {
  id: number;
  title: string;
  progress: number;
  link: string;
}
