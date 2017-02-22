import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import novelCtrl from '../controllers/novel.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/novels - Get list of novels */
  .get(novelCtrl.list)

  /** POST /api/novels - Create new novel */
  .post(validate(paramValidation.createNovel), novelCtrl.create);

router.route('/get/:novelId')
  /** GET /api/novels/:novelId - Get a novel */
  .get(novelCtrl.get);

router.route('/delete/:novelId')
  /** DELETE /api/novels/:novelId - Delete novel */
  .delete(novelCtrl.remove);

router.route('/take/:novelId')
  /** PUT /api/novels/take/:novelId - Take a new task */
  .put(novelCtrl.take);

router.route('/submit/:novelId')
  /** POST /api/novels/submit/:novelId - Submit a task */
  .post(novelCtrl.submit);

/** Load novel when API with novelId route parameter is hit */
router.param('novelId', novelCtrl.load);

export default router;
