import { IconProps } from '@phosphor-icons/react';
import React, { Suspense, memo } from 'react';

type IconModule = {
  [key: string]: React.ComponentType<any>;
};

const loadIcon = (iconName: string) => {
  return React.lazy(() =>
    import('@phosphor-icons/react').then((module: unknown) => {
      const castedModule = module as IconModule;

      const Icon = castedModule[iconName];
      if (Icon) {
        return { default: Icon };
      } else {
        return {
          default: () => (
            <div style={{ textAlign: 'center' }}>
              Custom
              <br />
              Icon
            </div>
          ),
        };
      }
    })
  );
};

const IconDisplay = memo(({ value }: { value: string }) => {
  // Carga el ícono perezosamente utilizando React.lazy
  const Icon = loadIcon(value);

  return (
    <div style={{ border: 'white 1px solid', padding: '1rem', borderRadius: '8px' }}>
      <Suspense fallback={<p>...</p>}>
        {Icon ? (
          <Icon size={32} color="white" /> // Ajusta el tamaño y color según necesites
        ) : (
          <p>Icon not found</p> // Mensaje si el ícono no existe
        )}
      </Suspense>
    </div>
  );
});

export default IconDisplay;
