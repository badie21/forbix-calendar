import { ReactNode } from 'react';

export enum CalendarViews {
  DAY = 'DAY',
  MONTH = 'MONTH',
  YEAR = 'YEAR'
}

export enum DateSelectionType {
  SINGLE = 'single',
  RANGE = 'range'
}

export interface IDatePickerProps {
  onChange: (_value: { from: Date | undefined; to: Date | undefined }) => void;
  value?: { from?: Date | undefined; to?: Date | undefined };
  inputClassName?: string;
  type?: DateSelectionType;
  mode?: 'modal' | 'dropdown';
  name?: string;
  doubleMonth?: boolean;
  disablePreviousDays?: boolean;
  renderDayFn?: (
    _day: { timestamp: number; currentMonth: boolean },
    _index: number
  ) => ReactNode;
  label?: string;
  selectableDates?: string[];
  size?: 'small' | 'medium';
  disabled?: boolean;
  selectedDayTooltipText?: string;
  hasError?: boolean;
  dayShouldBeDisabled?: (_timestamp: number) => boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  showAdornment?: boolean;
  locale: 'fa' | 'en';
  availableRange?: number;
}

export interface ICalendarProps {
  onChange: (_startDate: number | null, _endDate: number | null) => void;
  type?: DateSelectionType;
  doubleMonth?: boolean;
  startDate?: null | number;
  endDate?: null | number;
  locale?: 'fa' | 'en';
  disablePreviousDays?: boolean;
  renderDayFn?: (
    _day: { timestamp: number; currentMonth: boolean },
    _index: number
  ) => ReactNode;
  containerClassName?: string;
  selectableDates?: string[];
  selectedDayTooltipText?: string;
  dayShouldBeDisabled?: (_timestamp: number) => boolean;
  disableNavigation?: boolean;
  startDateFrom?: number;
  holidays?: number[];
}

export interface ICalendarState {
  year: number;
  month: number;
  hoveredDay: null | number;
}

export interface IDataPickerBodyProps {
  year: number;
  month: number;
  renderMonthBody: (_year: number, _month: number) => ReactNode;
  locale: 'fa' | 'en';
  doubleMonth: boolean;
}

export interface IDatePickerHeaderProps {
  setMonth: (_offset: 1 | -1) => void;
  year: number;
  month: number;
  doubleMonth: boolean;
  locale: 'en' | 'fa';
  onViewChange: (_viewName: CalendarViews) => void;
  disableNavigation?: boolean;
}

export interface IMonthPickerProps {
  currentMonth: number;
  onSelectMonth: (_month: number) => void;
  locale: 'fa' | 'en';
  currentYear: number;
  onChangeYear: (_offset: -1 | 1) => void;
  onViewChange: (_viewName: CalendarViews) => void;
}

export interface IYearPickerProps {
  currentYear: number;
  onSelectYear: (_year: number) => void;
}
