import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { FC, useMemo, useState } from 'react';

import styles from './datepicker.module.css';
import { IYearPickerProps } from './types';

const YearPicker: FC<IYearPickerProps> = ({ currentYear, onSelectYear }) => {
  const [page, setPage] = useState(0);

  const yearList = useMemo(() => {
    const firstYear = currentYear + page * 20;

    const yearArray = [];

    for (let i = 0; i < 20; i++) {
      yearArray.push(firstYear - i);
    }

    return yearArray;
  }, [currentYear, page]);

  const changePageHandler = (offset: -1 | 1) => {
    setPage((prev) => prev + offset);
  };

  const selectYearHandler = (year: number) => {
    onSelectYear(year);
  };

  return (
    <div className={styles['yearpicker__container']}>
      <div className={styles['yearpicker__header']}>
        <div onClick={() => changePageHandler(-1)}>
          <LeftOutlined />
        </div>

        <div>
          <span>{`${yearList[0].toString()} - ${yearList[
            yearList.length - 1
          ].toString()}`}</span>
        </div>

        <div onClick={() => changePageHandler(1)}>
          <RightOutlined />
        </div>
      </div>

      <div className={styles['yearpicker__body']}>
        {yearList.map((year) => (
          <div
            key={year}
            className={classNames(
              styles['yearpicker__year'],
              year === currentYear && styles['yearpicker__year--selected']
            )}
            onClick={() => selectYearHandler(year)}
          >
            <span>{year.toString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearPicker;
