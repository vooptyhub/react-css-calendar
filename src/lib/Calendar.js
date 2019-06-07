import moment from 'moment'
import { minutesInHour, tenMinutes } from './Constants'

export const gridTemplateRows = (total, start, end, width) => {
  const repeat = (times, width) => times > 0 ? `repeat(${times}, ${width})` : '';
  return [
    repeat(start, '0px'),
    repeat(end - start, width),
    repeat(total - end, '0px')
  ].join(' ')
};

const timeToRowNumber = (time, baseTime) => {
  return Math.floor((time - baseTime) / 1000 / minutesInHour / tenMinutes)
};

class Range {
  constructor () {
    this.events = [];
    this.startRow = null;
    this.endRow = null;
  }

  inRange (value) {
    return value >= this.startRow && value < this.endRow
  }

  add (event) {
    this.events.push(event);

    if (this.events.length === 1) {
      this.startRow = event.startRow;
      this.endRow = event.endRow;
    } else {
      this.startRow = Math.min(this.startRow, event.startRow);
      this.endRow = Math.max(this.endRow, event.endRow)
    }
  }

  isOverlap (event) {
    if (this.startRow === null) {
      return true
    }

    return this.inRange(event.startRow) || this.inRange(event.endRow)
  }
}

export const groupByOverlap = (events, date) => {
  const startOfDay = moment(date).startOf('day');
  const endOfDay = moment(startOfDay).add(1, 'day');

  const orderedEvents = [...events]
    .map(e => ({
      ...e,
      startRow: timeToRowNumber(Math.max(moment(e.start), startOfDay), startOfDay),
      endRow: timeToRowNumber(Math.min(moment(e.end), endOfDay), startOfDay),
    }))
    .sort((a, b) => a.startRow - b.startRow);

  const ranges = [new Range()];

  orderedEvents.forEach(item => {
    let range = ranges[ranges.length - 1];
    if (range.isOverlap(item)) {
      range.add(item)
    } else {
      range = new Range();
      range.add(item);
      ranges.push(range)
    }
  });

  return ranges
};