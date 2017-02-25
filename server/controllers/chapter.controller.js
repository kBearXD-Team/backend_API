import Chapter from '../models/chapter.model';

/**
 * Load chapter and append to req.
 */
function load(req, res, next, id) {
  Chapter.get(id)
    .then((chapter) => {
      req.chapter = chapter; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get chapter
 * @returns {Chapter}
 */
function get(req, res) {
  return res.json(req.chapter);
}

/**
 * Create new chapter
 * @property ...
 * @returns {Chapter}
 */
function create(req, res, next) {
  const chapter = new Chapter({
    author: req.body.author,
    content: req.body.content,
    novel: req.body.novel,
  });

  chapter.save()
    .then(savedChapter => res.json(savedChapter))
    .catch(e => next(e));
}

/**
 * Update existing chapter
 * @property {string} ...
 * @returns {Chapter}
 */
function update(req, res, next) {
  const chapter = req.chapter;
  chapter.author = req.body.author || chapter.author;
  chapter.content = req.body.content || chapter.content;
  chapter.rate = req.body.rate || chapter.rate;
  chapter.updatedAt = Date.now,

  chapter.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get chapter list.
 * @property {number} req.query.skip - Number of chapters to be skipped.
 * @property {number} req.query.limit - Limit number of chapters to be returned.
 * @returns {Chapter[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Chapter.list({ limit, skip })
    .then(chapters => res.json(chapters))
    .catch(e => next(e));
}

/**
 * Delete chapter.
 * @returns {Chapter}
 */
function remove(req, res, next) {
  const chapter = req.chapter;
  chapter.remove()
    .then(deletedChapter => res.json(deletedChapter))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove};
