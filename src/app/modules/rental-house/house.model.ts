import { model, Schema } from 'mongoose';
import { THouse } from './house.interface';

const houseSchema = new Schema<THouse>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    }, 
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    district : {
      type: String,
      required: [true, 'District is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: 0,
    },
    rooms: {
      type: String,
      required: [true, 'roomss are required'],
      min: 0,
    },
    imageUrl: {
      type: [String],
      required: [true, 'Image Url is required'],
    },
    landlordId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    amenities : {
      type: [String],
      required: [true, 'Amenities is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const House = model<THouse>('House', houseSchema);
