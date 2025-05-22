import { Types } from "mongoose";

export interface THouse {
    name : string,
    location : string,
    district : string,
    description:string,
    amount:number,
    rooms : string,
    imageUrl : string[],
    landlordId : Types.ObjectId ,
    amenities : string[]
}