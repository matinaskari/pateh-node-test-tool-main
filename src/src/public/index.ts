import feathers from "@feathersjs/client";
import request from "./reqSender";
import io from "socket.io-client";
import { Test } from "./interfaces/test.interface";

// Set up socket.io
const socket = io("/");
// Initialize a Feathers app
const app = feathers();

// Register socket.io to talk to our server
app.configure(feathers.socketio(socket));

let rowId = 0;

// Form submission handler that creats a row
(document.getElementById("creationForm") as HTMLElement).onsubmit = async (
  event: Event
) => {
  event.preventDefault();

  let body = {} as Test;

  const method = document.getElementById("method") as HTMLSelectElement;
  const methodValue = method.value as "GET" | "POST";

  const inputs = document.querySelectorAll(
    "#creationForm input"
  ) as NodeListOf<HTMLInputElement>;

  for (const input of inputs) {
    if (!input.value) continue;
    body = { ...body, [input.getAttribute("name") ?? "name"]: input.value };
  }

  body["id"] = rowId;
  body["method"] = methodValue;

  await request("POST", `/api/start-test/${body.numberOfRequests}`, body);

  // Create a new message with the input field value
  await app.service("tables").create(body);

  (document.getElementById("creationModal") as HTMLElement).classList.remove(
    "show"
  );
  (document.querySelector("div.modal-backdrop.fade") as HTMLElement).remove();

  rowId += 1;
};

let tableBody = document.getElementById("main") as HTMLElement;
// Renders a single row on the table

function updateRow(rowId: number, body: Test) {
  let targetRow = document.getElementById(
    `table-row-${body.id}`
  ) as HTMLElement;

  targetRow.innerHTML = `<th scope="row">${body.id + 1}</th><td>${
    body.testPeriod
  }</td><td>${body.responseTime}</td><td>${body.method}</td><td>${
    body.numberOfRequests
  }</td><td>${body.doneRequests}</td>`;
}

function addRow(body: Test) {
  tableBody.innerHTML += `
 <tr id = "table-row-${body.id}"><th scope="row">${body.id + 1}</th><td>${
    body.testPeriod
  }</td><td>${body.responseTime}</td><td>${body.method}</td><td>${
    body.numberOfRequests
  }</td><td>${body.doneRequests}</td></tr>
`;
}

const main = async () => {
  // Find all existing messages
  const rows = await app.service("tables").find();
  // Add existing messages to the list
  rows.forEach(addRow);
  // Add any newly created message to the list in real-time
  app.service("tables").on("created", addRow);
};

main();
