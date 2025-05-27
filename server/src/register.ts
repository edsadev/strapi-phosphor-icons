import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'phosphor-icon',
    plugin: 'strapi-phosphor-icons',
    type: 'string',
  });
};

export default register;
