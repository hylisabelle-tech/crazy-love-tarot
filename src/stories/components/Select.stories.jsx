import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

/**
 * MUI Select 대표 데모
 *
 * FormControl + InputLabel + Select + MenuItem 조합의 기본 사용법.
 * 제어 컴포넌트(controlled) 패턴으로 상태를 관리한다.
 */
export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
};

/** 기본 단일 선택 데모 컴포넌트 */
function BasicSelect() {
  const [value, setValue] = useState('');
  return (
    <FormControl sx={{ width: 240 }}>
      <InputLabel id='demo-select-label'>카테고리</InputLabel>
      <Select
        labelId='demo-select-label'
        label='카테고리'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <MenuItem value='design'>Design</MenuItem>
        <MenuItem value='layout'>Layout</MenuItem>
        <MenuItem value='typography'>Typography</MenuItem>
      </Select>
    </FormControl>
  );
}

/** size / variant 변형 데모 컴포넌트 */
function VariantSelects() {
  const [a, setA] = useState('design');
  const [b, setB] = useState('design');
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl size='small' sx={{ width: 200 }}>
        <InputLabel id='small-label'>Small</InputLabel>
        <Select labelId='small-label' label='Small' value={a} onChange={(e) => setA(e.target.value)}>
          <MenuItem value='design'>Design</MenuItem>
          <MenuItem value='layout'>Layout</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant='filled' sx={{ width: 200 }}>
        <InputLabel id='filled-label'>Filled</InputLabel>
        <Select labelId='filled-label' label='Filled' value={b} onChange={(e) => setB(e.target.value)}>
          <MenuItem value='design'>Design</MenuItem>
          <MenuItem value='layout'>Layout</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

/** 기본 단일 선택 */
export const Basic = {
  render: () => <BasicSelect />,
};

/** size / variant 변형 */
export const Variants = {
  render: () => <VariantSelects />,
};
