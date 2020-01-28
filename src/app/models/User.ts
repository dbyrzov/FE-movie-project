export interface User {
    name: string;
    user_id: number;
    wishList: Array<number>;
    watchedList: Array<number>;
    events: Array<Event>;
}