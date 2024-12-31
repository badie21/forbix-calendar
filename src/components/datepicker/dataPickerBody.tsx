import classNames from 'classnames';
import { FC } from 'react';

import styles from './datepicker.module.css';
import { IDataPickerBodyProps } from './types';

const DataPickerBody: FC<IDataPickerBodyProps> = ({
  year,
  month,
  renderMonthBody,
  locale,
  doubleMonth
}) => {
  return (
    <div
      className={styles['datepicker_body']}
      style={{
        display: 'flex',
        gap: '1rem',
        flexDirection: locale === 'fa' ? 'row' : 'row-reverse',
        flexWrap: 'wrap'
      }}
    >
      <div className={styles['calendar__desktop']}>
        {renderMonthBody(year, month)}
      </div>

      {doubleMonth && (
        <div className={classNames(styles['calendar__desktop'])}>
          {renderMonthBody(
            month === 11 ? year + 1 : year,
            month === 11 ? 0 : month + 1
          )}
        </div>
      )}
    </div>
  );
};

export default DataPickerBody;
