import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import chapterCtrl from '../controllers/chapter.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/chapters - Get list of chapters */
  .get(chapterCtrl.list)

  /** POST /api/chapters - Create new chapter */
  .post(validate(paramValidation.createChapter), chapterCtrl.create);

router.route('/:chapterId')
  /** GET /api/chapters/:chapterId - Get chapter */
  .get(chapterCtrl.get)

  /** PUT /api/chapters/:chapterId - Update chapter */
  .put(validate(paramValidation.updateChapter), chapterCtrl.update)

  /** DELETE /api/chapters/:chapterId - Delete chapter */
  .delete(chapterCtrl.remove);

/** Load chapter when API with chapterId route parameter is hit */
router.param('chapterId', chapterCtrl.load);

export default router;
