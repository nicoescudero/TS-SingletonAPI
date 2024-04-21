import { UserSchema, getUsers, getUserById, createUser, updateUser, deleteUser } from './user.docs';
import { createProduct, getProducts, getProductById, updateProduct, deleteProductById } from './product.docs';
import { createMessage, getMessages, getMessageById, updateMessage, deleteMessageById } from './message.docs';

export const options = {
  openapi: '3.1.0',
  info: {
    title: 'Singleton Api-Rest',
    description: 'Api-Rest built with typescript and singleton design pattern',
    version: '1.0.0',
    termsOfService: 'https://exampledev.com/termsofservice/',
    contact: {
      name: 'nico',
      email: 'nico@example.com',
      url: 'https://exampledev.com/',
    },
    license: {
      name: 'Apache License 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local server'  
    },
  ],
  tags: {
    name: ['Users','Products','Message'],
  },
  paths: {
    '/users': {
      get: getUsers,
      post: createUser,
    },
    '/users/{id}': {
      get: getUserById,
      put: updateUser,
      patch: updateUser,
      delete: deleteUser,
    },
    '/products': {
      get: getProducts,
      post: createProduct
    },
    '/products/{id}': {
      get: getProductById,
      put: updateProduct,
      patch: updateProduct,
      delete: deleteProductById,
    },
    '/message/': {
      get: getMessages,
      post: createMessage,
    },
    '/message/{id}': {
      get: getMessageById,
      put: updateMessage,
      patch: updateMessage,
      delete: deleteMessageById,
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      UserSchema,
    }
  },
  apis: ['./src/docs/*.ts'],
};