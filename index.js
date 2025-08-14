const input = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const list = document.querySelector(".list");
const sonar = document.querySelector(".sonar");
const myLiveDay = document.querySelector(".live-years");
const clearAll = document.querySelector('.clear__all') 

let count = 0;

function calculateLiveDay() {
  setInterval(() => {
    const birthday = new Date(2003, 4, 28);

    const nowDate = new Date();

    const differenceTime = nowDate - birthday;
    const days = Math.round(differenceTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(days / 365.25);

    let decimalPart = Math.round(
      (days / 365.25 - Math.floor(days / 365.25)) * 365.25
    );

    myLiveDay.textContent = `I lived for ${years} years ${decimalPart} day`;
  }, 1000);
}
calculateLiveDay();

// Sahifa yuklanganda localStoragedagi malumotlarni yuklab olamiz
window.addEventListener("load", () => {
  const tasks = getTasks(); /* saqlangan malumotlarni olamiz */
  tasks.forEach((task) => {
    addTaskToPage(task); /* har birini sahifaga chiqaramiz */
  });
});

// localStoragedan malumotlarni olish funksiyasi
function getTasks() {
  const data = localStorage.getItem("tasks"); // tasks nomli kalitdan malumotlarni olamiz
  return data ? JSON.parse(data) : []; // malumot bo'lsa JSON formatida massivga aylantirish
}

// localrStoragega malumotlarni saqalash
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks)); // massivni JSON formatda saqlab olamiz
}

// vazifani sahifaga chiqaradigan funksiya
function addTaskToPage(taskObj) {
  count++;

  const { id, text } = taskObj; //obektdan id va textni ajratib olamiz

  const li = document.createElement("li");
  li.classList.add("item");
  list.appendChild(li);

  const spanCount = document.createElement('span')
  spanCount.textContent = `${count}.`
  spanCount.classList.add('counter')
  li.appendChild(spanCount)

  const span = document.createElement("span");
  span.textContent = text;
  span.classList.add("text-span");
  li.appendChild(span);

  const iconsDiv = document.createElement("div");
  iconsDiv.classList.add("icons-div");
  li.appendChild(iconsDiv);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("done-btn");
  doneBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.3282 8.32837L15.8939 5.89405C14.7058 4.706 14.1118 4.11198 13.4268 3.88941C12.8243 3.69364 12.1752 3.69364 11.5727 3.88941C10.8877 4.11198 10.2937 4.706 9.10564 5.89405L7.49975 7.49994M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
  iconsDiv.appendChild(doneBtn);

  const deletorBtn = document.createElement("button");
  deletorBtn.classList.add("delete-btn");
  deletorBtn.innerHTML = `
         <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"
                ></path>
              </svg>
        `;
  iconsDiv.append(deletorBtn);

  // // ustiga chizib qo'yish
  // iconsDiv.querySelector(".done-btn").addEventListener("click", () => {
  //   span.style.textDecoration = "line-through";
  //   console.log("Sadf");
  // });

  // taskni o'chirib yuborish
  iconsDiv.querySelector(".delete-btn").addEventListener("click", () => {
    list.removeChild(li);
    const tasks = getTasks().filter((t) => t.id !== id); // localStoragedag massivdan bu vazifani olib tashlaymiz
    saveTasks(tasks); // yangilangan ro'yxatni localStoragega saqlaymiz
  location.reload();
  });

  // tahrirlash funksiyasi
  iconsDiv.querySelector(".done-btn").addEventListener("click", () => {
    const input = document.createElement("input"); //yangi input yaratamiz
    input.type = "text";
    input.value = span.textContent; //ichiga eski matinni yozib qo'yadi

    li.replaceChild(input, span); // span o'rniga inputni qo'yamiz
    input.focus(); //cursorni inputga olib boramiz

    //Tahrir tugaganda
    input.addEventListener("blur", () => finishEdit(input));
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") finishEdit(input); //Enter bosilganda ham tahrir yakunlanadi
    });
  });

  function finishEdit(input) {
    const newText = input.value.trim(); //kiritilgan yangi ma'lumot

    if (newText === "") return; //agar bo'sh bo'lsa hech narsa qilmaymiz
    const tasks = getTasks();
    const index = tasks.findIndex((t) => t.id === id); //ID bo'yicha massivdan qidiramiz

    if (index !== -1) {
      // findIndex usha idni topolmasa -1 qaytaradi
      tasks[index].text = newText// eski textni yangisiga almashtiradi
      saveTasks(tasks); // yangilangan ro'yxatni saqlaymiz
      console.log(newText);
      
    }

    span.textContent = newText; // Sahifada yangi matin paydo bo'ladi
    li.replaceChild(span, input);
  }
}

addBtn.addEventListener("click", () => {
  let taskText = input.value.trim() //inputdagi matinni olamiz
  taskText=taskText.charAt(0).toUpperCase() + taskText.slice(1)
  if (taskText !== "") {
    const taskObj = { id: Date.now(), text: taskText }; // har bir vazifaga noyob ID beramiz

    addTaskToPage(taskObj);
    const tasks = getTasks(); //oldingi vazifalarni olamiz
    tasks.push(taskObj); // yangi vazifani qo'shamiz
    saveTasks(tasks); //saqlaymiz
    input.value = ""; //inputni bo'shatish

    sonar.style.display = "none ";
  } else {
    sonar.style.display = "block";
  }

  // location.reload();

});

// addBtn.addEventListener("click", function () {
//   // if (input.value.trim() !== "") {
//   //   const li = document.createElement("li");
//   //   li.classList.add("item");
//   //   list.appendChild(li);

//   //   const span = document.createElement("span");
//   //   span.textContent = input.value;
//   //   span.classList.add("text-span");
//   //   li.appendChild(span);

//   //   const iconsDiv = document.createElement("div");
//   //   iconsDiv.classList.add("icons-div");
//   //   li.appendChild(iconsDiv);

//   //   const doneBtn = document.createElement("button");
//   //   doneBtn.classList.add("done-btn");
//   //   doneBtn.innerHTML = `<svg viewBox="0 -1.5 11 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>done_mini [#1484]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-304.000000, -366.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <polygon id="done_mini-[#1484]" points="259 207.6 252.2317 214 252.2306 213.999 252.2306 214 248 210 249.6918 208.4 252.2306 210.8 257.3082 206"> </polygon> </g> </g> </g> </g></svg>`;
//   //   iconsDiv.appendChild(doneBtn);

//   //   const deletorBtn = document.createElement("button");
//   //   deletorBtn.classList.add("delete-btn");
//   //   deletorBtn.innerHTML = `
//   //        <svg
//   //               xmlns="http://www.w3.org/2000/svg"
//   //               x="0px"
//   //               y="0px"
//   //               width="24"
//   //               height="24"
//   //               viewBox="0 0 24 24"
//   //             >
//   //               <path
//   //                 d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"
//   //               ></path>
//   //             </svg>
//   //       `;
//   //   iconsDiv.append(deletorBtn);

//   //   input.value = "";

//   //   iconsDiv.querySelector(".done-btn").addEventListener("click", () => {
//   //     span.style.textDecoration = "line-through";
//   //     console.log("Sadf");
//   //   });

//   //   iconsDiv.querySelector(".delete-btn").addEventListener("click", () => {
//   //     list.removeChild(li);
//   //   });

//   //   sonar.style.display = "none";
//   // } else {
//   //   sonar.style.display = "block";
//   // }
// });

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click(); // buttonni avtomatik bosish
  }
});

clearAll.addEventListener('click',function(){
 localStorage.clear()
 location.reload()
})


