import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

/**
 * MUI TextField 대표 데모
 *
 * variant(outlined/filled/standard), 상태(error/disabled), helperText 등
 * 기본 입력 컴포넌트의 핵심 사용법을 보여준다.
 */
export default {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    placeholder: '입력하세요',
    variant: 'outlined',
    size: 'medium',
    disabled: false,
    error: false,
  },
};

/** 기본 입력 (Controls로 속성 조절) */
export const Playground = {};

/** variant 3종 */
export const Variants = {
  render: () => (
    <Stack spacing={2} sx={{ width: 280 }}>
      <TextField label='Outlined' variant='outlined' />
      <TextField label='Filled' variant='filled' />
      <TextField label='Standard' variant='standard' />
    </Stack>
  ),
};

/** 상태별 표현 */
export const States = {
  render: () => (
    <Stack spacing={2} sx={{ width: 280 }}>
      <TextField label='기본' helperText='도움말 텍스트' />
      <TextField label='에러' error helperText='필수 입력 항목입니다' />
      <TextField label='비활성' disabled value='수정 불가' />
    </Stack>
  ),
};
