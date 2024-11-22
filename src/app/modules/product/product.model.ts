import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: {
        values: [
          'Fiction',
          'Science',
          'SelfDevelopment',
          'Poetry',
          'Religious',
        ],
        message: 'Invalid category : {VALUE}',
      },
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },

    // isDeleted: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  },
);
// productSchema.pre('find', function (next) {
//   this.find({ isDeleted: { $ne: true } }).select('-isDeleted');
//   next();
// });
// productSchema.pre('findOne', function (next) {
//   this.findOne({ isDeleted: { $ne: true } }).select('-isDeleted');
//   next();
// });

// productSchema.pre('aggregate', function (next) {
//   // this.aggregate({ isDeleted: { $ne: true } });
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

//   next();
// });

export const Product = model<TProduct>('Product', productSchema);
