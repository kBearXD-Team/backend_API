import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      facebook_id: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/novels
  createNovel: {
    body: {
      title: Joi.string().required(),
    }
  },

  // PUT /api/take/novels
  takeTask: {
    body: {
      user: Joi.string().required(),
    },
    params: {
      novelId: Joi.string().hex().required()
    }
  },

  // POST /api/chapters
  createChapter: {
    body: {
      author: Joi.string().hex().required(),
      novel: Joi.string().hex().required()
    }
  },

  // UPDATE /api/chapters/:chapterId
  updateChapter: {
    body: {
      content: Joi.string().required()
    },
    params: {
      chapterId: Joi.string().hex().required()
    }
  },
};
