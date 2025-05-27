import React, {
  useState,
  forwardRef,
  useMemo,
  BaseSyntheticEvent,
  Suspense,
  useEffect,
} from 'react';
import { Combobox, ComboboxOption, Flex, Field } from '@strapi/design-system';
import Icons from './iconNames';
import { type InputProps } from '@strapi/strapi/admin';
import IconDisplay from './IconDisplay';

type InputPickerProps = InputProps & {
  onChange: (event: { target: { name: string; value: string } }) => void;
  value: string;
  error?: string;
  description?: string;
  attribute: {
    options?: {
      allowCustom?: boolean;
      isRequired?: boolean;
    };
  };
};

const ICON_NAMES = [...Icons, 'NoLactose', 'Digestion'];
const MAX_RESULTS = 50; // Máximo de opciones mostradas

const InputPicker = forwardRef<HTMLInputElement, InputPickerProps>(
  ({ name, onChange, value, label, required, error, attribute }, ref) => {
    console.log(value);
    const [searchTerm, setSearchTerm] = useState('');
    const [iconShown, setIconShown] = useState(value || '');

    const allowCustom = attribute?.options?.allowCustom ?? false;

    // Filtrado optimizado con useMemo para evitar cálculos innecesarios
    const iconOptions = useMemo(() => {
      const lowerSearch = searchTerm.toLowerCase(); // Convertir solo una vez
      return ICON_NAMES.filter((iconName) => iconName.toLowerCase().includes(lowerSearch)).slice(
        0,
        MAX_RESULTS
      );
    }, [searchTerm]); // Se recalcula solo si searchTerm cambia

    const handleChange = (selectedIcon: string) => {
      onChange({ target: { name, value: selectedIcon } });
    };

    useEffect(() => {
      console.log('Esto es el efecto', value);
      setIconShown(value);
    }, [value]);

    return (
      <Field.Root
        id="custom_icon"
        error={error}
        required={required}
        hint="Check to pick an icon https://phosphoricons.com/"
      >
        <Flex gap={{ initial: '1' }}>
          <Flex
            gap={{ initial: '1' }}
            direction={{ initial: 'column' }}
            alignItems={{ initial: 'flex-start' }}
          >
            <Field.Label>{label}</Field.Label>
            <Combobox
              placeholder="Selecciona un ícono"
              name={name}
              onInputChange={(e: BaseSyntheticEvent) => setSearchTerm(e.target.value)}
              onChange={handleChange}
              value={value}
              ref={ref}
              allowCustomValue={allowCustom} // Permitir valores personalizados si está activado
            >
              {iconOptions.map((iconName) => (
                <ComboboxOption key={iconName} value={iconName}>
                  {iconName}
                </ComboboxOption>
              ))}
            </Combobox>
          </Flex>
          {iconShown && <IconDisplay value={iconShown} />}
        </Flex>
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  }
);

InputPicker.displayName = 'InputPicker';

export default InputPicker;
