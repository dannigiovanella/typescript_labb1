
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


    console.log(newCourse);
});