import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Chapter Schema
 */
const ChapterSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "open",
  },
  novel: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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
ChapterSchema.method({
});

/**
 * Statics
 */
ChapterSchema.statics = {
  /**
   * Get chapter
   * @param {ObjectId} id - The objectId of chapter.
   * @returns {Promise<Chapter, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((chapter) => {
        if (chapter) {
          return chapter;
        }
        const err = new APIError('No such chapter exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List chapters in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of chapters to be skipped.
   * @param {number} limit - Limit number of chapters to be returned.
   * @returns {Promise<Chapter[]>}
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
 * @typedef Chapter
 */
export default mongoose.model('Chapter', ChapterSchema);
