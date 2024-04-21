const productResponses = {
  200: {
    description: 'Return product information',
    type: 'object',
    content: {
      'application/json': {
        example: {
          id: '6623cd4ea335774b8bc17d83',
          name: 'Arroz',
          description: 'Arroz fino',
          price: '5',
        },
      },
    },
  },
  201: {
    description: 'Product created',
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
    description: 'Products not found',
    type: 'object',
  },
  422: {
    description: 'Invalid Credentials',
  },
  500: {
    description: 'Internal server error',

  }
}

const getProducts = {
  summary: 'Product List',
  tags: ['Products'],
  security: [
    {
      bearerAuth: [],
    }
  ],
  responses: {
    200: productResponses[200],
    404: productResponses[404]
  }
}

const createProduct = {
  summary: 'Create new product',
  tags: ['Products'],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          example: {
            name: '',
            description: '',
            price: '',
          },
        },
      },
    },
  },
  responses: {
    201: productResponses[201],
    400: productResponses[400],
    422: productResponses[422],
    500: productResponses[500],
  }
}

const getProductById = {
  summary: 'Product info by ProductID',
  tags: ['Products'],
  security: {
    '- authToken': [],
  },
  parameters: [{
    name: 'id',
    in: 'path',
    description: 'Product ID',
    required: true,
    type: 'string',
  }],
  responses: {
    200: productResponses[200],
    404: productResponses[404],
  }
}

const updateProduct = {
  summary: 'Update a product by id',
  tags: ['Products'],
  security: [
    {
      bearerAuth: [],
    }
  ],
  parameters: [{
    name: 'id',
    in: 'path',
    description: 'Product ID',
    required: true,
    type: 'string',
  }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          example: {
            name: '',
            description: '',
            price: '',
          },
        },
      },
    },
  },
  responses: {
    204: productResponses[204],
    400: productResponses[400],
    401: productResponses[401],
    404: productResponses[404],
    422: productResponses[422],
    500: productResponses[500],
  }
};

const deleteProductById = {
  summary: 'Delete a product by ProductID',
  tags: ['Products'],
  security: {
    '- authToken': [],
  },
  parameters: [{
    name: 'id',
    in: 'path',
    description: 'Product ID',
    required: true,
    type: 'string',
  }],
  responses: {
    204: productResponses[204],
    401: productResponses[401],
    404: productResponses[404],
  }
}

export { createProduct, getProducts, getProductById, updateProduct, deleteProductById }