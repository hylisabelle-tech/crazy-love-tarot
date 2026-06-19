import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

/**
 * MUI Typography 대표 데모
 *
 * theme.typography variant 스케일(h1~caption)을 그대로 보여준다.
 * 타이포 토큰 문서는 Style/Typography 스토리를 참고.
 */
export default {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
};

const variants = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'subtitle1', 'subtitle2',
  'body1', 'body2',
  'button', 'caption', 'overline',
];

/** variant 스케일 전체 */
export const Scale = {
  render: () => (
    <Stack spacing={1.5}>
      {variants.map((v) => (
        <Typography key={v} variant={v}>
          {v} — 다람쥐 헌 쳇바퀴에 타고파 Sphinx of black quartz
        </Typography>
      ))}
    </Stack>
  ),
};

/** 색상 토큰 적용 */
export const Colors = {
  render: () => (
    <Stack spacing={1}>
      <Typography variant='h6' color='text.primary'>text.primary</Typography>
      <Typography variant='h6' color='text.secondary'>text.secondary</Typography>
      <Typography variant='h6' color='primary.main'>primary.main</Typography>
      <Typography variant='h6' color='secondary.main'>secondary.main</Typography>
      <Typography variant='h6' color='error.main'>error.main</Typography>
    </Stack>
  ),
};
