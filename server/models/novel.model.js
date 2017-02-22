import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Novel Schema
 */
const NovelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "open",
  },
  timeLimit: {
    type: Number,
    default: 7,
  },
  charLimit: {
    type: Number,
    default: 3000,
  },
  users: {
    type: [String],
  },
  readCount: {
    type: Number,
    default: 0,
  },
  chapters: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  rate: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
NovelSchema.method({
});

/**
 * Statics
 */
NovelSchema.statics = {
  /**
   * Get novel
   * @param {ObjectId} id - The objectId of novel.
   * @returns {Promise<Novel, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((novel) => {
        if (novel) {
          return novel;
        }
        const err = new APIError('No such novel exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List novels in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of novels to be skipped.
   * @param {number} limit - Limit number of novels to be returned.
   * @returns {Promise<Novel[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef Novel
 */
export default mongoose.model('Novel', NovelSchema);
