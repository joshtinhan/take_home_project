import { InputNumber, Statistic, Button } from '@arco-design/web-react';
import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RefInputType } from '@arco-design/web-react/es/Input';
import { IRandomName } from '@/lib/store/sagas/rootSaga';
import { setDrawResult, setIsShowModal } from '@/lib/store/slices/appSlice';
import { useAppDispatch } from '@/lib/store/hook';

function getRandomNumber (min: number, max: number) {
  const randomFraction = Math.random();
  const randomNumberInRange = Math.floor(min + (randomFraction * (max - min)));
  return randomNumberInRange;
}

const CounterWidgetWrapper = styled.div`
  width:100%;
  border-color: lightgray;
  border-style: outset;
  display: flex;
  flex-direction: column;
  margin: 8px;
  padding: 16px;
  gap: 16px;
`;

const InputButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export function CounterWidget ({ userList }: { userList: IRandomName[] }) {
  const inputRef = useRef<RefInputType>(null);
  const [countdown, setCountdown] = useState(0);
  const [canCounting, setCanCounting] = useState(false);
  const currentNumRef = useRef(0);
  const dispatch = useAppDispatch();
  const now = Date.now();
  const handleOnFinish = useCallback(() => {
    setCanCounting(false);
    dispatch(setDrawResult(getRandomNumber(0, userList.length)));
    dispatch(setIsShowModal(true));
  }, []);
  const handleStartButtonClick = useCallback(() => {
    if (countdown !== 0) {
      setCanCounting((prev) => !prev);
    }
  }, [canCounting, countdown]);
  const handleSettingButtonClick = useCallback(() => {
    currentNumRef.current = 0;
    setCanCounting(false);
  }, [now]);
  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return (
    <CounterWidgetWrapper>
      <InputButtonWrapper>
        <InputNumber
          value={countdown}
          onChange={(value) => {
            setCountdown(value);
            currentNumRef.current = 0;
          }}
          suffix="分鐘"
          hideControl
          style={{ width: 200 }}
          size="small"
          ref={inputRef}
          onFocus={(e) => e.target.select()}
          precision={0}
          disabled={canCounting}
        />
        <Button type="primary" size="small" onClick={handleStartButtonClick} disabled={!countdown}>
          {canCounting ? '暫停' : '開始'}
        </Button>
        <Button type="secondary" size="small" onClick={handleSettingButtonClick}>
          重置
        </Button>
      </InputButtonWrapper>
      <Statistic.Countdown
        value={(currentNumRef.current === 0 ? countdown * 60 * 1000 : currentNumRef.current) + now}
        format="mm:ss"
        now={now}
        start={canCounting}
        onFinish={handleOnFinish}
        style={{
          fontSize: '50px',
          color: 'cornflowerblue',
        }}
        renderFormat={(valueDiff: number, formattedDiff: string) => {
          if (canCounting && countdown !== 0) {
            currentNumRef.current = valueDiff;
          }
          return formattedDiff;
        }}
      />
    </CounterWidgetWrapper>
  );
}
