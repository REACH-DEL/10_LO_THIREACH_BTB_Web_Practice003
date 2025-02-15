const addBtn = document.getElementById("add-btn");
const err = document.getElementById("error");
const tableData = document.getElementById("table-body");
const tasks = [];

function displayData() {
  tableData.innerHTML = "";
  tasks.forEach((t) => {
    tableData.innerHTML += `  
        <tr class="bg-white border-b border-gray-200 font-semibold">
          <th scope="row" class="px-6 py-4">${t.name}</th>
          <td class="px-6 py-4">${t.date}</td>
          ${
            t.priority == "Low"
              ? `<td class="px-6 py-4 text-green-600">${t.priority}</td>`
              : t.priority == "Medium"
              ? `<td class="px-6 py-4 text-yellow-600">${t.priority}</td>`
              : `<td class="px-6 py-4 text-red-600">${t.priority}</td>`
          }
          <td class="px-6 py-4">
            ${
              t.isComplete
                ? `<div class="py-2 px-4 bg-green-700 text-white w-[100px] rounded-xl text-center">Completed</div>`
                : `<div class="py-2 px-4 bg-yellow-700 text-white w-[100px] rounded-xl text-center">Pending</div>`
            }
          </td>
        </tr>
      `;

    if (!t.isComplete) {
      setTimeout(() => {
        t.isComplete = true;
        displayData();
      }, 3000);
    }
  });
}

addBtn.addEventListener("click", () => {
  err.style.display = "none";
  err.innerHTML = "";
  const name = document.getElementById("name").value;
  const date = document.getElementById("due-date").value;
  const priority = document.getElementById("priority").value;
  try {
    if (name.trim() === "" || date === "" || priority.trim() === "") {
      err.style.display = "block";
      throw "Input can not null! Please input all field!";
    }
    const curentDate = new Date();
    const dueDate = new Date(date);
    if (dueDate <= curentDate) {
      err.style.display = "block";
      throw "Due date can not eqaul current date or a old date";
    }
    const task = {
      name: name.trim(),
      date: date,
      priority: priority,
      isComplete: false,
    };
    tasks.push(task);
    displayData();
  } catch (error) {
    err.innerHTML = error;
  }
});
