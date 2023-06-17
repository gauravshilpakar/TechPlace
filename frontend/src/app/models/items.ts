export interface Items{
    id: number,
    name: String,
    description: String,
    price: String,
    availability: boolean,
    imageUrl: any,
    userId: number,
    location: String,
    datePosted: Date
}

export interface User{
    id:number,
    name: String, 
    email: String,
    avatarUrl: String
}