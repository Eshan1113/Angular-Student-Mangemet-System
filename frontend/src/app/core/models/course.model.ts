export interface Course {
    id?: number;
    title: string;
    description: string;
    duration: number;
    price: number;
    category: string;
    level: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }