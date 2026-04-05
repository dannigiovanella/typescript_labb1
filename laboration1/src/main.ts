

// ===== Interface =====

interface CourseInfo {
    code: string;
    name: string;
    progression: "A" | "B" | "C"; //literal type
    syllabus: string;
}

// ==== Local Storage ====

//Array att lagra flera kurser i
let courses: CourseInfo[] = [];

//Hämtar data om kurs som ligger sparat
const savedCourses = localStorage.getItem("courses");

if (savedCourses) {
    //Gör om text till js array/objekt
    try {
        courses = JSON.parse(savedCourses) as CourseInfo[];
    } catch {
        courses = [];
    }
}


// ==== Formulär ====

//Hämtar form-elementet. ! för att hantera ett eventuellt null
const form = document.querySelector<HTMLFormElement>("#courseform")!;

//Händelsyssnare för submitknapp
form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    //Hämtar input och select-element
    const code: string = document.querySelector<HTMLInputElement>("#code")!.value;
    const name: string = document.querySelector<HTMLInputElement>("#name")!.value;

    //Progressionsvärde kontrolleras med if-sats
    const progressionValue: string = document.querySelector<HTMLSelectElement>("#progression")!.value

    //Kontroll (narrowing) för värdet på select-element av progression
    if (
        progressionValue !== "A" &&
        progressionValue !== "B" &&
        progressionValue !== "C"
    ) {
        //Om nåt blir fel
        throw new Error("Felaktigt progressionsvärde");
    }
    const progression: "A" | "B" | "C" = progressionValue;

    const syllabus: string = document.querySelector<HTMLInputElement>("#syllabus")!.value;


    //Objekt med insamlad data från form
    const newCourse: CourseInfo = {
        code,
        name,
        progression,
        syllabus
    };

    //Lägger till ny kurs i listan för local storage
    courses.push(newCourse);
    //Lagrar kurser i local storage (gör om arrayen till textsträng )
    localStorage.setItem("courses", JSON.stringify(courses));

    //Kör funktion som visar kurser
    showCourses();

});

// ==== Skriv ut i DOM ====

function showCourses(): void {
    //Hämtar container för kurslista
    const courseList = document.querySelector<HTMLDivElement>("#courselist")!;

    // Tömmer listan först
    courseList.innerHTML = "";

    // Loopar igenom array med tillagda kurser och skriver ut i divar (index = plats i arrayen)
    courses.forEach((course: CourseInfo, index: number): void => {

        const courseDiv = document.createElement("div");

        //Element för varje del i div
        courseDiv.innerHTML = `
            <h3>${course.code} - ${course.name}</h3>
            <p>Progression: ${course.progression}</p>
            <a href="${course.syllabus}">Kursplan</a>
            <button>Ta bort</button>
        `;
        //Hämtar id för delete-knapp
        const deleteButton = courseDiv.querySelector<HTMLButtonElement>("button")!;

        //Händelselyssnare för delete-knapp
        deleteButton.addEventListener("click", () => {
            deleteCourse(index);
        });

        //Lägger till varje div i kurslistan
        courseList.appendChild(courseDiv);
    });
}

//Funktion för delete-knapp. Ta bort kurs
function deleteCourse(index: number): void {
    // Tar bort 1 kurs ur arrayen
    courses.splice(index, 1);

    // Uppdaterar lista
    localStorage.setItem("courses", JSON.stringify(courses));

    // Skriver ut uppdaterad lista
    showCourses();
}

showCourses();