const UserSchema = {
  components: {
      schemas: {
        User: {
          type: 'object',
          required: [
            'userName',
            'email',
            'password',
          ],
          properties: {
            id: {
              type: 'integer',
              description: 'id generated automatically',
            },
            name: {
              type: 'string',
              description:  'name of user',
            },
            email: {
              type: 'string',
              description: 'email of user',
            },
            password: {
              type: 'string',
              description: 'password of user',
            },
            example: {
              name: '',
              email: '',
              password: '',
            }
          },
        },
      },
      responses: {
        200: {
          description: 'returns user information',
          type: 'object',
          content: {
            'application/json': {
              example: {
                id: '1',
                username: 'John Doe',
                email: 'johndoe@example.com',
                password: '$2a$10$YoIyUHeciH67iIf/lewjXOHVmOSAEMbywYSOYMM2nrxbqMEWCUf2C',
              },
            },
          },
        },
        204: {
          description: 'Successful request. Does not return content',
        },
        400: {
          description: 'Bad Request',
          type: 'object',
          content: {
            'application/json': {
              example: {
                message: 'Bad Request',
              },
              }
            }
        },
        401: {
          description: 'invalid credentials',
          type: 'object',
          content: {
            'application/json': {
              example:{
                message: '[Error logging user] - [User - POST]: [Invalid Credentials]',
              },
            },
          },
        },
        404: {
          description: 'User not found',
          type: 'object',
          content: {
            'application/json': {
              example: {
                message: ['User Not found'],
              },
            },
          },
        },
        409: {
          description: 'User not found',
          type: 'object',
          content: {
            'application/json':{
              example: {
                message: ['This email already exists'],
              },
            },
          },
        },
        422: {
          description: 'Error, Unprocessable Entity',
          type: 'object',
          content: {
            'application/json': {
              example: {
                errors: [],
              },
            },
          },
        },
        500:{
          description: 'Server error',
          type: 'object',
          content: {
            'application/json': {
              example: {
                message: 'Server internal error',
              },
            },
          },
        },
    }
  },
   tags: {
    name: 'User',
    description: 'User Data',
  } 
}

const getUsers = {
  summary: 'User Info',
  tags: ['User'],
  security: [
    {
      bearerAuth: [],
    }
  ],
  responses: {
    200: UserSchema.components.responses[200],
    401: UserSchema.components.responses[401],
    404: UserSchema.components.responses[404],
  }
}

const getUserById = {
  summary: 'User Info By UserID',
  tags: ['User'],
  security: {
    '- authToken': [],
  },
  parameters: [{
    name: 'id',
    in: 'path',
    description: 'User ID',
    required: true,
    type: 'string',
  }],
  responses: {
    200: UserSchema.components.responses[200],
    401: UserSchema.components.responses[401],
    404: UserSchema.components.responses[404],
  }
}

const createUser = {
  summary: 'Create new user',
  tags: ['User'],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          example: {
            username: '',
            email: '',
            password: '',
          },
        },
      },
    },
  },
  responses: {
    201: UserSchema.components.responses[200],
    400: UserSchema.components.responses[400],
    422: UserSchema.components.responses[422],
    500: UserSchema.components.responses[500],
  }
}

const updateUser = {
  summary: 'Update a user by id',
  tags: ['User'],
  security: [
    {
      bearerAuth: [],
    }
  ],
  parameters: [{
    name: 'id',
    in: 'path',
    description: 'User ID',
    required: true,
    type: 'string',
  }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          example: {
            username: '',
            email: '',
            password: '',
          },
        },
      },
    },
  },
  responses: {
    204: UserSchema.components.responses[204],
    400: UserSchema.components.responses[400],
    401: UserSchema.components.responses[401],
    404: UserSchema.components.responses[404],
    409: UserSchema.components.responses[409],
    422: UserSchema.components.responses[422],
    500: UserSchema.components.responses[500],
  }
};

const deleteUser = {
  summary: 'Delete a user by id',
  tags: ['User'],
  security: {
    '- authToken': [],
    tags: ['UserSchema'],
  },
  parameters: [{
    name: 'id',
    in: 'path',
    description: 'User ID',
    required: true,
    type: 'string',
  }],
  responses: {
    204: UserSchema.components.responses[204],
    401: UserSchema.components.responses[401],
    404: UserSchema.components.responses[404],
  }
};

export { UserSchema, getUsers, getUserById, createUser, updateUser, deleteUser };
