import Input from 'components/input/Input';
import Checkbox from 'components/input/Input';

const a = [
  {
    type: 'input',
    material: Input,
    label: 'name',
    value: 'vvv',
    methods: {
      onChange: (value) => {
        console.log(value);
      },
    },
  },
  {
    type: 'checkbox',
    material: Checkbox,
    label: 'name',
    value: true,
    methods: {
      onChange: (value) => {
        console.log(value);
      },
    },
  },
];
