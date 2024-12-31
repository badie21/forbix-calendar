import { Col, InputNumber, Radio, Row, Switch, Typography } from 'antd';
import React, { useState } from 'react';

import DatePicker from './components/datepicker';
import { DateSelectionType } from './components/datepicker/types';

function App() {
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });

  const [dateType, setDateType] = useState<'fa' | 'en'>('fa');

  const [dateSelectionType, setDateSelectionType] = useState<DateSelectionType>(
    DateSelectionType.SINGLE
  );

  const [disablePreviousDays, setDisablePreviousDays] = useState(false);

  const [availableRange, setAvailableRange] = useState<number>(1);

  const [canUseAvailableRange, setCanUseAvailableRange] = useState(false);

  return (
    <div
      className="App"
      style={{ height: '100dvh', direction: 'ltr', padding: '5rem' }}
    >
      <Row justify="space-around" align="middle">
        <Col
          xs={24}
          md={12}
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            padding: '4rem'
          }}
        >
          <div
            style={{
              direction: 'rtl',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Typography.Text>تاریخ انتخاب شده</Typography.Text>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography.Text>
                {date.from
                  ? new Date(date.from).toLocaleString(dateType, {
                      dateStyle: 'medium'
                    })
                  : ''}
              </Typography.Text>
              {dateSelectionType === DateSelectionType.RANGE && (
                <>
                  <Typography.Text style={{ margin: '0 2rem' }}>
                    تا
                  </Typography.Text>
                  <Typography.Text>
                    {date.to &&
                      new Date(date.to).toLocaleString(dateType, {
                        dateStyle: 'medium'
                      })}
                  </Typography.Text>
                </>
              )}
            </div>
          </div>
          <div
            style={{
              direction: 'rtl',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Typography.Text>مدل انتخاب تاریخ</Typography.Text>
            <Radio.Group
              onChange={(event) => {
                setDateSelectionType(event.target.value);
              }}
              defaultValue={dateSelectionType}
              size={'large'}
              buttonStyle="solid"
            >
              <Radio.Button value={DateSelectionType.SINGLE}>
                single
              </Radio.Button>
              <Radio.Button value={DateSelectionType.RANGE}>range</Radio.Button>
            </Radio.Group>
          </div>
          <div
            style={{
              direction: 'rtl',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Typography.Text>نوع تقویم</Typography.Text>
            <Radio.Group
              onChange={(event) => {
                setDateType(event.target.value);
              }}
              defaultValue={dateType}
              size={'large'}
              buttonStyle="solid"
            >
              <Radio.Button value="en">میلادی</Radio.Button>
              <Radio.Button value="fa">شمسی</Radio.Button>
            </Radio.Group>
          </div>
          <div
            style={{
              direction: 'rtl',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Typography.Text>غیر فعال کردن روزهای قبلی</Typography.Text>
            <Switch
              checked={disablePreviousDays}
              onChange={(val) => setDisablePreviousDays(val)}
            />
          </div>
          <div
            style={{
              direction: 'rtl',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Typography.Text>تا بازه</Typography.Text>
            <InputNumber
              disabled={!canUseAvailableRange}
              min={1}
              value={availableRange}
              onChange={(value) =>
                setAvailableRange(value === null ? 1 : value)
              }
              suffix="روز"
            />
            <Switch
              checked={canUseAvailableRange}
              onChange={(val) => setCanUseAvailableRange(val)}
            />
          </div>
        </Col>
        <Col
          xs={24}
          md={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <DatePicker
            locale={dateType}
            type={dateSelectionType}
            availableRange={canUseAvailableRange ? availableRange : undefined}
            disablePreviousDays={disablePreviousDays}
            onChange={(value) => setDate(value)}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
