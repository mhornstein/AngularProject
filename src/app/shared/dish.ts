import { Comment } from './comment';
export class Dish {
    id: string;
    name: string;
    image: string; //URL for the image
    category: string;
    featured: boolean;
    label: string;
    price: string;
    description: string;
    comments: Comment[];
}

