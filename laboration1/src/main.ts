
//Interface

interface CourseInfo {
    code: string;
    name: string;
    progression: "A" | "B" | "C"; //literal type
    syllabus: string;
}

//Formulär

//Hämtar form-elementet. ! för att hantera ett eventuellt null
const form = document.querySelector<HTMLFormElement>("#courseform")!;

//Händelsyssnare för submitknapp
form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    //Hämtar input och select-element
    const code = document.querySelector<HTMLInputElement>("#code")!.value;
    const name = document.querySelector<HTMLInputElement>("#name")!.value;

    //Progressionsvärde kontrolleras med if-sats
    const progressionValue = document.querySelector<HTMLSelectElement>("#progression")!.value

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

    const syllabus = document.querySelector<HTMLInputElement>("#syllabus")!.value;


    //Objekt med insamlad data från form
    const newCourse: CourseInfo = {
        code,
        name,
        progression,
        syllabus
    };

    //Skriv ut i DOM

    //Hämtar container för kurslista
    const courseList = document.querySelector<HTMLDivElement>("#courselist")!;

    //Skapar en div för varje kurs med innehåll
    const courseDiv = document.createElement("div");

    //Skriver ut inforamtionen i DOM
    courseDiv.innerHTML = `
  <h3>${newCourse.code} - ${newCourse.name}</h3>
  <p>Progression: ${newCourse.progression}</p>
  <a href="${newCourse.syllabus}">Kursplan</a>
`;

    //Lägger alla element i diven för varje kurs
    courseList.appendChild(courseDiv);

});

