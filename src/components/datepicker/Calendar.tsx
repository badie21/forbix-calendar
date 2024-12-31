import classNames from 'classnames';
import jmoment from 'moment-jalaali';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';

import DataPickerBody from './dataPickerBody';
import styles from './datepicker.module.css';
import DatePickerHeader from './datePickerHeader';
import {
  getFirstDayIndexInMonth,
  getNumberOfDays,
  isEqualDays
} from './helper';
import MonthPicker from './monthpicker';
import {
  CalendarViews,
  DateSelectionType,
  ICalendarProps,
  ICalendarState
} from './types';
import YearPicker from './yearPicker';

const todayTimestamp = new Date().setHours(0, 0, 0, 0);

const Calendar: FC<ICalendarProps> = ({
  onChange,
  type = DateSelectionType.SINGLE,
  doubleMonth = false,
  startDate,
  endDate,
  locale = 'en',
  disablePreviousDays = false,
  renderDayFn,
  containerClassName,
  // selectableDates,
  selectedDayTooltipText,
  dayShouldBeDisabled,
  disableNavigation = false,
  startDateFrom,
  holidays = []
}) => {
  const currentDate = startDateFrom
    ? jmoment(startDateFrom)
    : startDate
      ? jmoment(startDate)
      : jmoment();

  const [state, setState] = useState<ICalendarState>({
    year: locale === 'fa' ? currentDate.jYear() : currentDate.year(),
    month: locale === 'fa' ? currentDate.jMonth() : currentDate.month(),
    hoveredDay: null
  });

  useEffect(() => {
    setState({
      year: locale === 'fa' ? currentDate.jYear() : currentDate.year(),
      month: locale === 'fa' ? currentDate.jMonth() : currentDate.month(),
      hoveredDay: null
    });
  }, [locale]);

  const [view, setView] = useState<CalendarViews>(CalendarViews.DAY);

  const setRange = (selectedDay: number): void => {
    if (!startDate && !endDate) {
      setState((prev) => {
        return {
          ...prev,
          hoveredDay: selectedDay
        };
      });
      onChange(selectedDay, null);

      return;
    } else if (startDate && !endDate) {
      setState((prev) => {
        return {
          ...prev,
          hoveredDay: selectedDay
        };
      });
      if (selectedDay > startDate) {
        onChange(startDate, selectedDay);
      } else if (selectedDay === startDate) {
        onChange(selectedDay, selectedDay);
      } else {
        onChange(selectedDay, null);
      }
    } else if (startDate && endDate) {
      if (selectedDay === startDate) {
        setState((prev) => ({ ...prev, hoveredDay: null }));
        onChange(null, null);
      } else {
        setState((prev) => {
          return {
            ...prev,
            hoveredDay: selectedDay
          };
        });
        onChange(selectedDay, null);
      }

      return;
    }
  };

  const changeYearHandler = (year: number) => {
    setState((prev) => ({ ...prev, year: year }));
    setView(CalendarViews.MONTH);
  };

  const changeMonthHandler = (month: number) => {
    setState((prev) => ({ ...prev, month }));
    setView(CalendarViews.DAY);
  };

  const setMonth = (offset: 1 | -1): void => {
    let year = state.year;

    let month = state.month + offset;

    if (month === -1) {
      month = 11;
      year = year - 1;
    } else if (month === 12) {
      month = 0;
      year = year + 1;
    }
    setState((prev) => {
      return {
        ...prev,
        year,
        month
      };
    });
  };

  const setYear = (offset: 1 | -1) => {
    setState((prev) => ({ ...prev, year: prev.year + offset }));
  };

  const onDateClick = (timestamp: number): void => {
    if (type === 'range') {
      setRange(timestamp);
    } else {
      onChange(timestamp, null);
      // setState((prev) => ({ ...prev, hoveredDay: null }));
    }
  };

  const changeViewHandler = (viewName: CalendarViews) => {
    setView(viewName);
  };

  const getCalendarBlockDetails = (year: number, month: number) => {
    const currentMonthDaysCount = getNumberOfDays(year, month, locale);

    const monthBlockArray = [];

    const offsetFromPrevMonth = getFirstDayIndexInMonth(year, month, locale);

    const offsetFromNextMonth =
      42 - currentMonthDaysCount - offsetFromPrevMonth;

    //adding offset from previous month to the current block
    if (offsetFromPrevMonth > 0) {
      const prevMonthDaysCount =
        month === 1
          ? getNumberOfDays(year - 1, 12, locale)
          : getNumberOfDays(year, month - 1, locale);

      for (let offset = 0; offset < offsetFromPrevMonth; offset++) {
        const dateString = `${month === 0 ? year - 1 : year}/${(month === 0 ? 11 : month - 1) + 1}/${prevMonthDaysCount - offset}`;

        const date = new Date(
          locale === 'fa'
            ? jmoment(dateString, 'jYYYY-jMM-jDD').toLocaleString()
            : dateString
        );

        monthBlockArray.push({
          timestamp: date.setHours(0, 0, 0, 0),
          currentMonth: false
        });
      }
    }

    for (let day = 1; day <= currentMonthDaysCount; day++) {
      const dateString = `${year}/${month + 1}/${day}`;

      const date = new Date(
        locale === 'fa'
          ? jmoment(dateString, 'jYYYY-jMM-jDD').toLocaleString()
          : dateString
      );

      monthBlockArray.push({
        timestamp: date.setHours(0, 0, 0, 0),
        currentMonth: true
      });
    }

    //adding offset from next month to the current block
    if (offsetFromNextMonth > 0) {
      for (let offset = 1; offset <= offsetFromNextMonth; offset++) {
        const dateString = `${month === 11 ? year + 1 : year}/${month === 11 ? 12 : month + 1}/${offset}`;

        const date = new Date(
          locale === 'fa'
            ? jmoment(dateString, 'jYYYY-jMM-jDD').toLocaleString()
            : dateString
        );

        monthBlockArray.push({
          timestamp: date.setHours(0, 0, 0, 0),
          currentMonth: false
        });
      }
    }

    return monthBlockArray;
  };

  /**
   *  Renderers
   */

  const renderDay = useCallback(
    (
      day: { currentMonth: boolean; timestamp: number },
      index: number
    ): React.ReactNode => {
      const shouldBeDisabled = Boolean(
        dayShouldBeDisabled && dayShouldBeDisabled(day.timestamp)
      );

      const isHoliday = holidays.find((_day) => _day === day.timestamp);

      const currentDay = jmoment(day.timestamp);

      const isFriday = currentDay.day() === 5;

      const isDisabled =
        shouldBeDisabled ||
        (day.timestamp < todayTimestamp && disablePreviousDays);

      const isToday = isEqualDays(day.timestamp, todayTimestamp);

      const isSelectedSingleDate =
        isEqualDays(day.timestamp, startDate) && type === 'single';

      const isHoveredDay =
        startDate &&
        type === 'range' &&
        !endDate &&
        (state.hoveredDay as number) >= day.timestamp &&
        day.timestamp > startDate;

      const isFromDate =
        isEqualDays(day.timestamp, startDate) && type === 'range';

      const isToDate = type === 'range' && day.timestamp === endDate;

      const isInrange =
        type === 'range' &&
        endDate &&
        startDate &&
        day.timestamp > startDate &&
        day.timestamp < endDate;

      return (
        <div
          key={index}
          onMouseOver={() => {
            if (!endDate && state.hoveredDay) {
              setState((prev) => {
                return {
                  ...prev,
                  hoveredDay: day.timestamp
                };
              });
            } else if (endDate && state.hoveredDay) {
              setState((prev) => {
                return {
                  ...prev,
                  hoveredDay: day.timestamp
                };
              });
            }
          }}
          className={classNames(
            styles['day'],
            isDisabled && styles['day--disabled'],
            isHoveredDay && styles['day--hovered'],
            isToday && styles['day--today'],
            isSelectedSingleDate && styles['day--selected'],
            isFromDate && styles['day--selected-from'],
            isToDate && styles['day--selected-to'],
            isInrange && styles['day--inRange'],
            isFriday
              ? holidays.length && !isHoliday
                ? ''
                : styles['day--holiday']
              : '',
            isHoliday && styles['day--holiday']
          )}
          style={day.currentMonth ? {} : { opacity: 0 }}
          onClick={() => {
            if (!day.currentMonth) return;
            onDateClick(day.timestamp);
          }}
        >
          <span className={styles['day-content']}>
            {locale === 'fa' ? currentDay.jDate() : currentDay.date()}
          </span>
        </div>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startDate, endDate, state.hoveredDay, type, disablePreviousDays, locale]
  );

  const renderCalendar = (year: number, month: number) => {
    const monthD = getCalendarBlockDetails(year, month);

    const days = monthD.map((day, index) =>
      renderDayFn ? renderDayFn(day, index) : renderDay(day, index)
    );

    const weekNameList =
      locale === 'en'
        ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
        : ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

    return (
      <>
        <div
          className={styles['month__header']}
          style={{ flexDirection: locale === 'fa' ? 'row' : 'row-reverse' }}
        >
          {weekNameList.map((dName, i) => (
            <span
              key={i}
              className={classNames(
                styles['month__header--item'],
                i === 6 && styles['month__header--item-holiday']
              )}
            >
              {dName}
            </span>
          ))}
        </div>

        <div
          className={styles['month__body']}
          style={{ flexDirection: locale === 'fa' ? 'row' : 'row-reverse' }}
        >
          {days}
        </div>
      </>
    );
  };

  return (
    <div
      className={classNames(styles['calendar__container'], containerClassName)}
    >
      {view === CalendarViews.DAY ? (
        <>
          <DatePickerHeader
            year={state.year}
            month={state.month}
            setMonth={setMonth}
            doubleMonth={doubleMonth}
            locale={locale}
            onViewChange={changeViewHandler}
            disableNavigation={disableNavigation}
          />

          <DataPickerBody
            year={state.year}
            month={state.month}
            renderMonthBody={renderCalendar}
            locale={locale}
            doubleMonth={doubleMonth}
          />
        </>
      ) : view === CalendarViews.MONTH ? (
        <MonthPicker
          currentMonth={state.month}
          locale={locale}
          onSelectMonth={changeMonthHandler}
          onChangeYear={setYear}
          currentYear={state.year}
          onViewChange={changeViewHandler}
        />
      ) : (
        <YearPicker currentYear={state.year} onSelectYear={changeYearHandler} />
      )}
    </div>
  );
};

export default memo(Calendar);
