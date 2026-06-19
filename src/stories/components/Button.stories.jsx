import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

/**
 * MUI Button 대표 데모
 *
 * 디자인 토큰(theme.palette) 기반 색상과 MUI 기본 variant/size를 보여준다.
 * 커스텀 래핑 없이 순수 MUI 컴포넌트를 그대로 사용한다.
 */
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    disabled: false,
  },
};

/** 기본 버튼 (Controls로 속성 조절) */
export const Playground = {};

/** variant 3종 */
export const Variants = {
  render: () => (
    <Stack direction='row' spacing={2}>
      <Button variant='contained'>Contained</Button>
      <Button variant='outlined'>Outlined</Button>
      <Button variant='text'>Text</Button>
    </Stack>
  ),
};

/** size 3종 */
export const Sizes = {
  render: () => (
    <Stack direction='row' spacing={2} alignItems='center'>
      <Button variant='contained' size='small'>Small</Button>
      <Button variant='contained' size='medium'>Medium</Button>
      <Button variant='contained' size='large'>Large</Button>
    </Stack>
  ),
};

/** palette 색상 토큰 */
export const Colors = {
  render: () => (
    <Stack direction='row' spacing={2} flexWrap='wrap'>
      <Button variant='contained' color='primary'>Primary</Button>
      <Button variant='contained' color='secondary'>Secondary</Button>
      <Button variant='contained' color='error'>Error</Button>
      <Button variant='contained' color='success'>Success</Button>
      <Button variant='contained' color='warning'>Warning</Button>
    </Stack>
  ),
};
