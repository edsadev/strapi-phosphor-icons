import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import * as yup from 'yup';

export default {
  register(app: any) {
    app.customFields.register({
      name: 'phosphor-icon',
      pluginId: 'strapi-phosphor-icons',
      type: 'string',
      intlLabel: {
        id: 'strapi-phosphor-icons.label',
        defaultMessage: 'Phosphor Icon',
      },
      intlDescription: {
        id: 'strapi-phosphor-icons.description',
        defaultMessage: 'Selecciona un ícono de Phosphor',
      },
      components: {
        Input: async () => import('./components/Input'),
      },
      options: {
        base: [
          {
            intlLabel: {
              id: 'global.required',
              defaultMessage: 'Required',
            },
            name: 'required',
            type: 'bool',
            description: {
              id: 'global.required.description',
              defaultMessage: 'Make this field required.',
            },
          },
        ],
        advanced: [
          {
            sectionTitle: {
              id: 'strapi-phosphor-icons.advanced.section',
              defaultMessage: 'Advanced Settings',
            },
            items: [
              {
                intlLabel: {
                  id: 'strapi-phosphor-icons.advanced.allow-custom.label',
                  defaultMessage: 'Allow Custom Icons',
                },
                name: 'options.allowCustom',
                type: 'bool',
                description: {
                  id: 'strapi-phosphor-icons.advanced.allow-custom.description',
                  defaultMessage: 'Enable this to allow users to enter custom icon names.',
                },
              },
            ],
          },
        ],
        validator: () => ({
          allowCustom: yup.boolean().optional(),
        }),
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
