import React, { Component } from "react";
import moment from "moment";
import { range } from "moment-range";
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'
export default class Calendar extends Component {
	weekdayshort = moment.weekdaysShort();

	state = {
		showYearTable: false,
		showMonthTable: false,
		showDateTable: true,
		dateObject: moment(),
		allmonths: moment.months(),
		selectedDay: null,
	};

  // To get the days we have from moment
	daysInMonth = () => {
		return this.state.dateObject.daysInMonth();
	};
  // To get year
	year = () => {
		return this.state.dateObject.format("Y");
	};
  // To get the current day
	currentDay = () => {
		return this.state.dateObject.format("D");
	};
  // To get when the first day in a month will most likely fall to
	firstDayOfMonth = () => {
		let dateObject = this.state.dateObject;
		let firstDay = moment(dateObject).startOf("month").format("d"); // Day of week 0...1..5...6
		return firstDay;
	};
  // GEt months
	month = () => {
		return this.state.dateObject.format("MMMM");
	};
  // Show month modal based on user input
	showMonth = (e, month) => {
		this.setState({
			showMonthTable: !this.state.showMonthTable,
			showDateTable: !this.state.showDateTable,
		});
	};
  // Set month
	setMonth = (month) => {
		let monthNo = this.state.allmonths.indexOf(month);
		let dateObject = Object.assign({}, this.state.dateObject);
		dateObject = moment(dateObject).set("month", monthNo);
		this.setState({
			dateObject: dateObject,
			showMonthTable: !this.state.showMonthTable,
			showDateTable: !this.state.showDateTable,
		});
	};
  // Obtain list of months
	MonthList = (props) => {
		let months = [];
		props.data.map((data) => {
			months.push(
				<td
					key={data}
					className="text-center"
					onClick={(e) => {
						this.setMonth(data);
					}}
				>
					<span className="pr-5 font-semibold">{data}</span>
				</td>,
			);
		});
		let rows = [];
		let cells = [];

		months.forEach((row, i) => {
			if (i % 3 !== 0 || i == 0) {
				cells.push(row);
			} else {
				rows.push(cells);
				cells = [];
				cells.push(row);
			}
		});
		rows.push(cells);
		let monthlist = rows.map((d, i) => {
			return <tr>{d}</tr>;
		});

		return (
			<table className="calendar-month">
				<thead>
					<tr>
						<th colSpan="4">Select a Month</th>
					</tr>
				</thead>
				<tbody>{monthlist}</tbody>
			</table>
		);
	};
  // Display year in table
	showYearTable = (e) => {
		this.setState({
			showYearTable: !this.state.showYearTable,
			showDateTable: !this.state.showDateTable,
		});
	};

  // Slide in between dates with prev button
	onPrev = () => {
		let curr = "";
		if (this.state.showYearTable === true) {
			curr = "year";
		} else {
			curr = "month";
		}
		this.setState({
			dateObject: this.state.dateObject.subtract(1, curr),
		});
	};

  // Triggers when user clicks on the next button
	onNext = () => {
		let curr = "";
		if (this.state.showYearTable === true) {
			curr = "year";
		} else {
			curr = "month";
		}
		this.setState({
			dateObject: this.state.dateObject.add(1, curr),
		});
	};
  // Setting the year obj based on action
	setYear = (year) => {
		// alert(year)
		let dateObject = Object.assign({}, this.state.dateObject);
		dateObject = moment(dateObject).set("year", year);
		this.setState({
			dateObject: dateObject,
			showMonthTable: !this.state.showMonthTable,
			showYearTable: !this.state.showYearTable,
		});
	};
  // Handle on year change
	onYearChange = (e) => {
		this.setYear(e.target.value);
	};
  // Get dates
	getDates(startDate, stopDate) {
		var dateArray = [];
		var currentDate = moment(startDate);
		var stopDate = moment(stopDate);
		while (currentDate <= stopDate) {
			dateArray.push(moment(currentDate).format("YYYY"));
			currentDate = moment(currentDate).add(1, "year");
		}
		return dateArray;
	}
	YearTable = (props) => {
		let months = [];
		let nextten = moment().set("year", props).add("year", 12).format("Y");

		let tenyear = this.getDates(props, nextten);

		tenyear.map((data) => {
			months.push(
				<td
					key={data}
					className="font-semibold text-center"
					onClick={(e) => {
						this.setYear(data);
					}}
				>
					<span className="pr-10">{data}</span>
				</td>,
			);
		});
		let rows = [];
		let cells = [];

		months.forEach((row, i) => {
			if (i % 3 !== 0 || i == 0) {
				cells.push(row);
			} else {
				rows.push(cells);
				cells = [];
				cells.push(row);
			}
		});
		rows.push(cells);
		let yearlist = rows.map((d, i) => {
			return <tr>{d}</tr>;
		});
    // Returned when user clicks on a year
		return (
			<table className="calendar-month">
				<thead>
					<tr>
						<th colSpan="4">Select a year</th>
					</tr>
				</thead>
				<tbody>{yearlist}</tbody>
			</table>
		);
	};

  // Returned when a user click on a date
	onDayClick = (e, d) => {
		this.setState(
			{
				selectedDay: d,
			},
			() => {
				console.log("SELECTED DAY: ", this.state.selectedDay);
			},
		);
	};
	render() {
		let weekdayshortname = this.weekdayshort.map((day) => {
			return <th className="pr-3 text-sm text-gray-500" key={day}>{day}</th>;
		});
		let blanks = [];
		for (let i = 0; i < this.firstDayOfMonth(); i++) {
			blanks.push(<td className="calendar-day empty">{""}</td>);
		}
		let daysInMonth = [];
		for (let d = 1; d <= this.daysInMonth(); d++) {
			let currentDay = d == this.currentDay() ? "today" : "";
			daysInMonth.push(
				<td key={d} className={`calendar-day ${currentDay}`}>
					<span
						onClick={(e) => {
							this.onDayClick(e, d);
						}}
					>
						{d}
					</span>
				</td>,
			);
		}
		var totalSlots = [...blanks, ...daysInMonth];
		let rows = [];
		let cells = [];

		totalSlots.forEach((row, i) => {
			if (i % 7 !== 0) {
				cells.push(row);
			} else {
				rows.push(cells);
				cells = [];
				cells.push(row);
			}
			if (i === totalSlots.length - 1) {
				// let insertRow = cells.slice();
				rows.push(cells);
			}
		});

		let daysinmonth = rows.map((d, i) => {
			return <tr className="cursor-pointer">{d}</tr>;
		});

		return (
			<div className="bg-white rounded-xl p-10">
				<div className="flex justify-between items-center">
        <div
            onClick={(e) => {
              this.onPrev();
            }}
            className="p-2 text-lg rounded-xl border border-solid"
          >
            <FaAngleLeft />
          </div>
					{!this.state.showMonthTable && (
						<span
							onClick={(e) => {
								this.showMonth();
							}}
							className="font-bold text-lg text-gray-600"
						>
							{this.month()}
						</span>
					)}
					<span
						className="font-bold text-lg text-gray-600"
						onClick={(e) => this.showYearTable()}
					>
						{this.year()}
					</span>
          <div
            onClick={(e) => {
              this.onNext();
            }}
            className="p-2 text-lg rounded-xl border border-solid"
          >
            <FaAngleRight
            />
          </div>
				</div>

				<div className="calendar-date">
					{this.state.showYearTable && <this.YearTable props={this.year()} />}
					{this.state.showMonthTable && (
						<this.MonthList data={moment.months()} />
					)}
				</div>

				{this.state.showDateTable && (
					<div className="calendar-date mt-3">
						<table className="calendar-day">
							<thead>
								<tr className="">{weekdayshortname}</tr>
							</thead>
							<tbody className="text-center">{daysinmonth}</tbody>
						</table>
            <div className="text-center font-bold">Date: <span className="text-semibold text-sm text-gray-600">{this.state.selectedDay} {this.month()}, {this.year()}</span></div>
					</div>
				)}
			</div>
		);
	}
}
