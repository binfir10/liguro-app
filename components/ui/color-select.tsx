// ColorSelect.tsx
import React from 'react';
import Select, { components, SingleValueProps, OptionProps, StylesConfig } from 'react-select';

interface ColorOption {
  id: number;
  name: string;
  hexa: string;
}

const hexaName: ColorOption[] = [
  { id: 1, name: "Ninguno", hexa: "bg-transparent" },
  { id: 2, name: "Amarillo", hexa: "bg-yellow-500" },
  { id: 3, name: "Verde", hexa: "bg-green-500" },
  { id: 4, name: "Azul", hexa: "bg-blue-500" },
  { id: 5, name: "Purpura", hexa: "bg-purple-500" },
  { id: 6, name: "Rosa", hexa: "bg-pink-500" },
  { id: 7, name: "Gris", hexa: "bg-gray-500" },
  { id: 8, name: "Rojo", hexa: "bg-red-500" },
  { id: 9, name: "Naranja", hexa: "bg-orange-500" },
  { id: 10, name: "Indigo", hexa: "bg-indigo-500" },
  { id: 11, name: "Lima", hexa: "bg-lime-500" },
  { id: 12, name: "Cyan", hexa: "bg-cyan-500" },
];

const customStyles: StylesConfig<ColorOption, false> = {
  option: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
};

const CustomOption = (props: OptionProps<ColorOption>) => {
  return (
    <components.Option {...props}>
      <span className={`w-4 h-4 mr-2 rounded-full ${props.data.hexa}`} />
      {props.data.name}
    </components.Option>
  );
};

const SingleValue = (props: SingleValueProps<ColorOption>) => {
  return (
    <components.SingleValue {...props}>
      <span className={`w-4 h-4 mr-2 rounded-full ${props.data.hexa}`} />
      {props.data.name}
    </components.SingleValue>
  );
};

const ColorSelect: React.FC = () => {
  const options = hexaName.map(color => ({
    value: color.hexa,
    label: color.name,
    ...color,
  }));

  const handleColorFilterChange = (selectedOption: ColorOption | null) => {
    console.log(selectedOption);
  };

  return (
    <Select
      options={options}
      onChange={handleColorFilterChange}
      styles={customStyles}
      components={{ Option: CustomOption, SingleValue }}
      placeholder="Filtrar por color"
    />
  );
};

export default ColorSelect;
