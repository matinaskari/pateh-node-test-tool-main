import { Row } from "./interfaces/row.interface";

export class TableService {
  rows: Row[] = [];

  async find() {
    // Just return all our rows
    return this.rows;
  }

  async create(data: Row) {
    // The new Row is the data text with a unique identifier added
    // using the rows length since it changes whenever we add one
    const newRow: Row = {
      id: this.rows.length,
      testPeriod: Number(data.testPeriod),
      responseTime: Number(data.responseTime),
      method: data.method,
      numberOfRequests: Number(data.numberOfRequests),
      doneRequests: 0,
    };

    // Add new Row to the list
    this.rows.push(newRow);

    return newRow;
  }

  async updateRow() {
    const targetRow = this.rows[0];
    targetRow.doneRequests += 1;
  }
}
