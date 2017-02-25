import Novel from '../models/novel.model';

/**
 * Load novel and append to req.
 */
function load(req, res, next, id) {
  Novel.get(id)
    .then((novel) => {
      req.novel = novel; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get novel
 * @returns {Novel}
 */
function get(req, res) {
  return res.json(req.novel);
}

/**
 * Create new novel
 * @property {string} req.body.title - The title of novel.
 * @returns {Novel}
 */
function create(req, res, next) {
  const novel = new Novel({
    title: req.body.title,
  });

  novel.save()
    .then(savedNovel => res.json(savedNovel))
    .catch(e => next(e));
}

/**
 * Get novel list.
 * @property {number} req.query.skip - Number of novels to be skipped.
 * @property {number} req.query.limit - Limit number of novels to be returned.
 * @returns {Novel[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Novel.list({ limit, skip })
    .then(novels => res.json(novels))
    .catch(e => next(e));
}

/**
 * Delete novel.
 * @returns {Novel}
 */
function remove(req, res, next) {
  const novel = req.novel;
  novel.remove()
    .then(deletedNovel => res.json(deletedNovel))
    .catch(e => next(e));
}

/**
 * Take a new task
 * @returns {Novel}
 */
function take(req, res, next) {
  const novel = req.novel;
  novel.users.push(req.body.user);
  novel.status = "processing";

  novel.save()
    .then(takenNovel => res.json(takenNovel))
    .catch(e => next(e));
}

/**
 * Submit a new task
 * @returns {Novel}
 */
function submit(req, res, next) {
  const novel = req.novel;
  novel.chapters.push(req.body.chapter);
  novel.status = "closed";
  novel.updatedAt = Date.now,

  novel.save()
    .then(submittedNovel => res.json(submittedNovel))
    .catch(e => next(e));
}

export default { load, get, create, list, remove, take, submit};
