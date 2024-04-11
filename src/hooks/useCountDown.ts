import { useCallback, useEffect, useRef, useState } from 'react';
export const useCountDown = (
  initCount = 10,
  callback = () => {},
  endBack = () => {}
) => {
  // 初始化定时器
  const timerId = useRef<{ id: number }>({ id: 0 });
  // 初始化倒计时
  const [count, setCount] = useState(initCount);
  // 初始化是否禁用
  const [isdisable, setIsdisable] = useState(false);
  // 开始执行倒计时
  const start = () => {
    setCount(initCount);
    setIsdisable(true);
    timerId.current.id = window.setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
  };
  // 请求定时器
  useEffect(() => {
    clearInterval(timerId.current.id);
  }, []);
  // 处理是否需要清除
  useEffect(() => {
    if (count !== initCount || isdisable) {
      callback();
    }
    if (count === 0) {
      clearInterval(timerId.current.id);
      setCount(initCount);
      endBack();
      setIsdisable(false);
    }
  }, [callback, count, initCount, endBack, isdisable]);
  return {
    start,
    count,
    isdisable,
  };
};
