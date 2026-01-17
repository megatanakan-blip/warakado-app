
export type PageId = 'home' | 'food' | 'rental' | 'tarot' | 'design' | 'music' | 'nostalgia' | 'member';

export interface MemberInfo {
  nickname: string;
  email: string;
  gender: string;
  ageGroup: string;
  serialNumber: string;
  points: number;
}

export interface MenuItem {
  id: PageId;
  title: string;
  icon: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}
