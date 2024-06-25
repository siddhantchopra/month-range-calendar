import React from 'react';
import { mount } from 'enzyme';
import MonthYearPicker from '../index';
import {act} from 'react-dom/test-utils'

describe('Month Range picker test suite', () => {

  let wrapper;
  const props = {
    getstateOfMonthy: ()=> {},
    monhtlyValue: {
      startDate: '2022/01',
      endDate: '2023/02',
      startMonth: '01',
      endMonth: '02',
      startYear: 2022,
      endYear: 2023,
      selectedMonth: 'Jan',
    },
    labels: {
      cancel: 'cancel',
      confirm:'confirm'
    },
    monthlistParent: [
      {
        label: "Jan",
        value: "01",
        className: 'start',
        disabled: false
      },
      {
        label: "Feb",
        value: "02",
        className: 'range',
        disabled: false
      },
      {
        label: "Mar",
        value: "03",
        className: 'range',
        disabled: false
      },
      {
        label: "Apr",
        value: "04",
        className: 'range',
        disabled: false
      },
      {
        label: "May",
        value: "05",
        className: 'end',
        disabled: false
      },
      {
        label: "Jun",
        value: "06",
        className: '',
        disabled: false
      },
      {
        label: "Jul",
        value: "07",
        className: '',
        disabled: false
      },
      {
        label: "Aug",
        value: "08",
        className: '',
        disabled: false
      },
      {
        label: "Sep",
        value: "09",
        className: '',
        disabled: false
      },
      {
        label: "Oct",
        value: "10",
        className: '',
        disabled: false
      },
      {
        label: "Nov",
        value: "11",
        className: '',
        disabled: false
      },
      {
        label: "Dec",
        value: "12",
        className: '',
        disabled: false
      },
    ]
  }
  function renderMount() {

    wrapper = mount(
      <MonthYearPicker {...props}/>
    );
  }

  it('<MonthRangepicker /> should render with props(snapshot)', () => {
    renderMount();
    expect(wrapper).toMatchSnapshot();
  });


  it('click on calendar title',()=>{
    renderMount();
    wrapper.update()
    act(()=>{
      wrapper.find('.month-tiles button').at(1).props().onClick()
    })
  })

  it('click on calendar input focus',()=>{
    renderMount();
    wrapper.update()
    act(()=>{
      const event = {
        target : {
          id: 'start-month'
        }
      }
      wrapper.find('#start-month').props().onFocus(event)
    })
  })

  it('click on calendar navigate to increase of years',()=>{
    renderMount();
    wrapper.update()
    act(()=>{
      const event = {
        currentTarget : {
          id: 'plus'
        }
      }
      wrapper.find('#plus').props().onClick(event)
    })
  })

  it('click on calendar navigate to decrease of years',()=>{
    renderMount();
    wrapper.update()
    act(()=>{
      const event = {
        currentTarget : {
          id: 'minus'
        }
      }
      wrapper.find('#minus').props().onClick(event)
    })
  })

  it('click on input field end date',()=>{
    renderMount();
    wrapper.update()
    act(()=>{
      const e = {
        target : {
          value: '02 2023'
        }
      }
      wrapper.find('#end-month').props().onChange(e)
    })
  })
});
