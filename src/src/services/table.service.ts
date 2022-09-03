import { NullableId } from "@feathersjs/feathers";
import { Row } from "./interfaces/row.interface";

export class TableService {
  rows: Row[] = [];

  async find() {
    // Just return all our rows
    return this.rows;
  }

  async create(data: Partial<any>): Promise<any> {
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

  async update(id: NullableId, data: any): Promise<any[]> {
    if (typeof id === "number") {
      const targetRow = this.rows.at(id) as Row;
      const newTargetRow: Row = {
        id: id,
        testPeriod: targetRow.responseTime,
        responseTime: targetRow.responseTime,
        method: targetRow.method,
        numberOfRequests: targetRow.numberOfRequests,
        doneRequests: targetRow.doneRequests + 1,
      };
      this.rows[id] = newTargetRow;

      console.log(this.rows);

      return this.rows;
    } else {
      return data;
    }
  }
}
