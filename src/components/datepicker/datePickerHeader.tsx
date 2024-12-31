import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';

import { PmonthMap, monthMap } from './constants';
import styles from './datepicker.module.css';
import { CalendarViews, IDatePickerHeaderProps } from './types';

const DatePickerHeader: React.FC<IDatePickerHeaderProps> = ({
  setMonth,
  year,
  month,
  doubleMonth,
  locale,
  onViewChange,
  disableNavigation = false
}) => {
  const currentMonth = locale === 'fa' ? PmonthMap[month] : monthMap[month];

  const nextMonth =
    locale === 'fa'
      ? PmonthMap[month === 11 ? 0 : month + 1]
      : monthMap[month === 11 ? 0 : month + 1];

  return (
    <div
      className={styles['calendar__header']}
      style={{
        gap: doubleMonth ? '1rem' : 0,
        flexDirection: locale === 'fa' ? 'row' : 'row-reverse'
      }}
    >
      <div className={classNames(styles['clickable'])}>
        <span
          className={classNames(styles['clickable'])}
          onClick={
            disableNavigation
              ? undefined
              : () => onViewChange(CalendarViews.MONTH)
          }
        >
          {currentMonth}
        </span>

        <span
          className={classNames(styles['clickable'])}
          style={{ margin: '0 .5rem' }}
          onClick={
            disableNavigation
              ? undefined
              : () => onViewChange(CalendarViews.YEAR)
          }
        >
          {year.toString()}
        </span>
      </div>
      {!disableNavigation && (
        <div className={classNames(styles['calendar-header__navigation'])}>
          <LeftOutlined
            onClick={() => (locale === 'fa' ? setMonth(-1) : setMonth(1))}
          />
          <RightOutlined
            onClick={() => (locale === 'fa' ? setMonth(+1) : setMonth(-1))}
          />
        </div>
      )}
      {doubleMonth && (
        <div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ marginLeft: '.5rem' }}>
              {month === 11 ? year + 1 : year}
            </span>

            <span>{nextMonth}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerHeader;
