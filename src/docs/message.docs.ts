const messageResponses = {
  200: {
    description: 'Return message information',
    type: 'object',
    content: {
      'application/json': {
        example: {
          emmiterID: '6623cd4ea335774b8bc17d83',
          receiverID: '6623cd4ea335774b8bc17d90',
          socketID: '5893cd4ea335774b8bc17d83e212',
          message: 'Hello!',
        },
      },
    },
  },
  201: {
    description: 'Message created',
    type: 'object',
    content: {
      'application/json': {
        example: {
          id: '6623cd4ea335774b8bc17d84',
          name: 'Fideos',
          description: 'Fideos Tallarines',
          price: '10',
        },
      },
    },
  },
  204: {
    description: 'Success!'
  },
  400: {
    description: 'Bad Request',
  },
  401: {
    description: 'Unauthorized',
  },
  404: {
    description: 'Messages not found',
    type: 'object',
  },
  422: {
    description: 'Invalid Credentials',
  },
  500: {
    description: 'Internal server error',

  }
}

const getMessages = {
  summary: 'Message List',
  tags: ['Message'],
  security: [
    {
      bearerAuth: [],
    }
  ],
  responses: {
    200: messageResponses[200],
    404: messageResponses[404],
  }
}

const createMessage = {
  summary: 'Create new Message',
  tags: ['Message'],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          example: {
            emmiterID: '',
            receiverID: '',
            socketID: '',
            message: '',
          },
        },
      },
    },
  },
  responses: {
    201: messageResponses[201],
    400: messageResponses[400],
    422: messageResponses[422],
    500: messageResponses[500],
  }
}

const getMessageById = {
  summary: 'Message info by MessageID',
  tags: ['Message'],
  security: {
    '- authToken': [],
  },
  parameters: [{
    name: 'id',
    in: 'path',
    description: 'Message ID',
    required: true,
    type: 'string',
  }],
  responses: {
    200: messageResponses[200],
    404: messageResponses[404],
  }
}

const updateMessage = {
  summary: 'Update a Message by id',
  tags: ['Message'],
  security: [
    {
      bearerAuth: [],
    }
  ],
  parameters: [{
    name: 'id',
    in: 'path',
    description: 'Message ID',
    required: true,
    type: 'string',
  }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          example: {
            emmiterID: '',
            receiverID: '',
            socketID: '',
            message: '',
          },
        },
      },
    },
  },
  responses: {
    204: messageResponses[204],
    400: messageResponses[400],
    401: messageResponses[401],
    404: messageResponses[404],
    422: messageResponses[422],
    500: messageResponses[500],
  }
};

const deleteMessageById = {
  summary: 'Delete a Message by MessageID',
  tags: ['Message'],
  security: {
    '- authToken': [],
  },
  parameters: [{
    name: 'id',
    in: 'path',
    description: 'Message ID',
    required: true,
    type: 'string',
  }],
  responses: {
    204: 'Message Deleted.',
    401: 'Unauthorized.',
    404: 'Message not found.',
  }
}

export { createMessage, getMessages, getMessageById, updateMessage, deleteMessageById }