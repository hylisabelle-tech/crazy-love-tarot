import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

/**
 * MUI Chip 대표 데모
 *
 * filled/outlined variant, palette 색상 토큰, 삭제 가능(deletable) 표현.
 */
export default {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'success', 'warning'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
  },
  args: {
    label: 'Chip',
    variant: 'filled',
    color: 'primary',
    size: 'medium',
  },
};

/** 기본 칩 (Controls로 속성 조절) */
export const Playground = {};

/** variant / 색상 토큰 */
export const Variants = {
  render: () => (
    <Stack direction='row' spacing={1} flexWrap='wrap'>
      <Chip label='Default' />
      <Chip label='Primary' color='primary' />
      <Chip label='Secondary' color='secondary' />
      <Chip label='Outlined' variant='outlined' color='primary' />
      <Chip label='Success' color='success' variant='outlined' />
    </Stack>
  ),
};

/** 삭제 가능 칩 */
export const Deletable = {
  render: () => (
    <Stack direction='row' spacing={1}>
      <Chip label='Design' onDelete={() => {}} />
      <Chip label='Layout' color='primary' onDelete={() => {}} />
      <Chip label='Typography' variant='outlined' onDelete={() => {}} />
    </Stack>
  ),
};
