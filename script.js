
// Getting HTML elements

const habitInput = document.getElementById("habitInput");

const habitList = document.getElementById("habitList");

const addButton = document.getElementById("addButton");


// Showing today's date

document.getElementById("date").innerText =
    new Date().toDateString();


// Sample habits

let habits = JSON.parse(
    localStorage.getItem("myHabits")
) || [
    { name: "Drink 8 glasses of water", completed: false },
    { name: "Study for 2 hours", completed: false },
    { name: "Exercise for 30 minutes", completed: false },
    { name: "Read something new", completed: false }
];


// Saving habits

function saveHabits() {

    localStorage.setItem(
        "myHabits",
        JSON.stringify(habits)
    );

}


// Adding a new habit

function addHabit() {

    let habitName = habitInput.value.trim();

    if (habitName === "") {

        alert("Please write something first!");

        return;

    }

    habits.push({
        name: habitName,
        completed: false
    });

    habitInput.value = "";

    saveHabits();

    displayHabits();

}


// Displaying habits

function displayHabits() {

    habitList.innerHTML = "";

    habits.forEach(function(habit, index) {

        // Creating habit box

        let div = document.createElement("div");

        div.className = "habit";


        if (habit.completed) {
            div.classList.add("completed");
        }


        // Creating checkbox

        let checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = habit.completed;


        checkbox.onchange = function() {

            habits[index].completed = checkbox.checked;

            saveHabits();

            displayHabits();

        };


        // Creating habit name

        let name = document.createElement("span");

        name.innerText = habit.name;


        // Creating delete button

        let deleteButton = document.createElement("button");

        deleteButton.innerText = "Delete";

        deleteButton.className = "delete-btn";


        deleteButton.onclick = function() {

            habits.splice(index, 1);

            saveHabits();

            displayHabits();

        };


        // Adding everything to the habit box

        div.appendChild(checkbox);

        div.appendChild(name);

        div.appendChild(deleteButton);

        habitList.appendChild(div);

    });


    updateProgress();

}


// Calculating progress

function updateProgress() {

    let total = habits.length;

    let completed = habits.filter(function(habit) {

        return habit.completed;

    }).length;


    let percent = 0;

    if (total > 0) {

        percent = Math.round(
            (completed / total) * 100
        );

    }


    document.getElementById("percentage").innerText =
        percent + "%";


    document.getElementById("progress").style.width =
        percent + "%";


    if (total === 0) {

        document.getElementById("progressText").innerText =
            "Add your first habit to get started!";

    }

    else if (percent === 100) {

        document.getElementById("progressText").innerText =
            "Yay! You completed everything today! ♡";

    }

    else {

        document.getElementById("progressText").innerText =
            completed + " out of " + total + " habits completed!";

    }

}


// Add habit when button is clicked

addButton.addEventListener("click", addHabit);


// Add habit when Enter is pressed

habitInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addHabit();

    }

});


// Display habits when website opens

displayHabits();
