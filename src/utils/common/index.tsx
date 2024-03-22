import dayjs from 'dayjs';
export const formatDateTime = (ctx: number | string, formatVal: string) => {
  return <span>{dayjs(ctx).format(formatVal)}</span>;
};
