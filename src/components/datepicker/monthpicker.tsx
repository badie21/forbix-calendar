import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { FC } from 'react';

import { months } from './constants';
import styles from './datepicker.module.css';
import { CalendarViews, IMonthPickerProps } from './types';

const MonthPicker: FC<IMonthPickerProps> = ({
  currentMonth,
  locale,
  onSelectMonth,
  currentYear,
  onChangeYear,
  onViewChange
}) => {
  const monthList = months[locale];

  return (
    <div className={styles['monthpicker__container']}>
      <div className={styles['monthpicker__header']}>
        <div onClick={() => onChangeYear(1)} className={styles['clickable']}>
          <RightOutlined />
        </div>

        <div onClick={() => onViewChange(CalendarViews.YEAR)}>
          <span>{currentYear.toString()}</span>
        </div>

        <div onClick={() => onChangeYear(-1)} className={styles['clickable']}>
          <LeftOutlined />
        </div>
      </div>

      <div className={styles['monthpicker__body']}>
        {monthList.map((month, index) => (
          <div
            key={index}
            className={classNames(
              styles['monthpicker__month'],
              currentMonth === index && styles['monthpicker__month--selected']
            )}
            onClick={() => onSelectMonth(index)}
          >
            <span>{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthPicker;
