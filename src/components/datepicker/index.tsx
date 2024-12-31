'use client';

import { Button, Col, Row } from 'antd';
import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';

import Calendar from './Calendar';
import styles from './datepicker.module.css';
import { DateSelectionType, IDatePickerProps } from './types';

const DatePicker: FC<IDatePickerProps> = ({
  onChange,
  value,
  type = DateSelectionType.SINGLE,
  doubleMonth = false,
  disablePreviousDays = false,
  renderDayFn,
  selectableDates,
  selectedDayTooltipText,
  dayShouldBeDisabled,
  locale,
  availableRange
}) => {
  const [date, setDate] = useState<{ from: null | number; to: null | number }>({
    from: value?.from ? new Date(value.from).setHours(0, 0, 0, 0) : null,
    to: value?.to ? new Date(value.to).setHours(0, 0, 0, 0) : null
  });

  const changeDateHandler = (
    startDate: number | null,
    endDate: number | null
  ) => {
    setDate({ from: startDate, to: endDate });
  };

  const clearFilterHandler = (e: MouseEvent<HTMLDivElement>) => {
    onChange({ from: undefined, to: undefined });
  };

  const submitDateHandler = useCallback(() => {
    if (type === 'single' && date.from) {
      onChange({ from: new Date(date.from), to: undefined });
    } else if (type === 'range' && date.from && date.to) {
      onChange({ from: new Date(date?.from), to: new Date(date?.to) });
    }
  }, [date]);

  useEffect(() => {
    setDate({ from: null, to: null });
  }, [type]);

  const checkAvailableRangeHandler = (time: number) => {
    if (type === DateSelectionType.SINGLE || !date.from || !availableRange)
      return false;

    const fromDate = new Date(date.from);

    const issueDate = new Date(time);

    const Difference_In_Time = issueDate.getTime() - fromDate.getTime();

    return Math.round(Difference_In_Time / (1000 * 3600 * 24)) > availableRange;
  };

  return (
    <Row>
      <Col className={styles['datePicker-container']} span={24}>
        <Calendar
          onChange={changeDateHandler}
          startDate={date.from}
          endDate={date.to}
          locale={locale}
          disablePreviousDays={disablePreviousDays}
          type={type}
          doubleMonth={doubleMonth}
          renderDayFn={renderDayFn}
          selectableDates={selectableDates}
          selectedDayTooltipText={selectedDayTooltipText}
          dayShouldBeDisabled={checkAvailableRangeHandler}
        />
      </Col>
      <Col
        span={24}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
          maxWidth: '400px'
        }}
      >
        <Button
          size={'large'}
          type={'primary'}
          onClick={submitDateHandler}
          style={{
            padding: '0 3rem',
            borderRadius: '20px',
            backgroundColor: 'black',
            color: 'white b  '
          }}
        >
          تایید
        </Button>
        <Button
          size={'large'}
          variant={'outlined'}
          onClick={clearFilterHandler}
          style={{
            padding: '0 3rem',
            borderRadius: '20px',
            borderColor: 'black',
            color: 'black'
          }}
        >
          انصراف
        </Button>
      </Col>
    </Row>
  );
};

export default DatePicker;
