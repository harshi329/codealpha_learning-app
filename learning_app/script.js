// =============================
// LANGUAGE DATA
// =============================
const languageData = {
spanish: [
{ word: "Hello", translation: "Hola" },
{ word: "Thank You", translation: "Gracias" },
{ word: "Friend", translation: "Amigo" },
{ word: "Good Morning", translation: "Buenos Días" },
{ word: "Goodbye", translation: "Adiós" }
],
french: [
{ word: "Hello", translation: "Bonjour" },
{ word: "Thank You", translation: "Merci" },
{ word: "Friend", translation: "Ami" },
{ word: "Good Morning", translation: "Bonjour" },
{ word: "Goodbye", translation: "Au revoir" }
],
german: [
{ word: "Hello", translation: "Hallo" },
{ word: "Thank You", translation: "Danke" },
{ word: "Friend", translation: "Freund" },
{ word: "Good Morning", translation: "Guten Morgen" },
{ word: "Goodbye", translation: "Auf Wiedersehen" }
]
};
// =============================
// FLASHCARD SYSTEM
// =============================
let currentLanguage = "spanish";
let currentIndex = 0;
let flipped = false;
const flashcard = document.getElementById("flashcard");
function loadCard() {
const card =
languageData[currentLanguage][currentIndex];
1
flashcard.textContent = card.word;
flipped = false;
}
flashcard.addEventListener("click", () => {
const card =
languageData[currentLanguage][currentIndex];
if (!flipped) {
flashcard.textContent =
card.translation;
} else {
flashcard.textContent =
card.word;
}
flipped = !flipped;
});
function nextCard() {
currentIndex++;
if (
currentIndex >=
languageData[currentLanguage].length
) {
currentIndex = 0;
}
loadCard();
}
function prevCard() {
currentIndex--;
if (currentIndex < 0) {
currentIndex =
languageData[currentLanguage].length - 1;
}
2
loadCard();
}
document
.getElementById("languageSelect")
.addEventListener("change", (e) => {
currentLanguage = e.target.value;
currentIndex = 0;
loadCard();
});
// =============================
// SPEECH
// =============================
function speakWord() {
const text =
languageData[currentLanguage]
[currentIndex]
.word;
const speech =
new SpeechSynthesisUtterance(text);
speechSynthesis.speak(speech);
}
// =============================
// DARK MODE
// =============================
const themeBtn =
document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
themeBtn.innerHTML="☀️";
}else{
themeBtn.innerHTML="🌙";
}

localStorage.setItem(
"theme",
document.body.classList.contains("dark")
);
});

if(localStorage.getItem("theme")==="true"){

document.body.classList.add("dark");
themeBtn.innerHTML="☀️";

}
// =============================
// QUIZ DATA
// =============================
const quizQuestions = [
{
question: "What is Hola?",
options: ["Hello", "Goodbye", "Book", "Food"],
answer: "Hello"
},
{
question: "What is Gracias?",
options: ["Thank You", "Friend", "Book", "Food"],
answer: "Thank You"
},
{
question: "What is Amigo?",
options: ["Friend", "Teacher", "Book", "Food"],
answer: "Friend"
},
{
question: "What is Bonjour?",
options: ["Hello", "Goodbye", "Teacher", "Food"],
answer: "Hello"
},
{
question: "What is Merci?",
options: ["Thank You", "Book", "Teacher", "Food"],
answer: "Thank You"
},
{
question: "What is Danke?",
options: ["Thank You", "Book", "Food", "Teacher"],
answer: "Thank You"
},

{
question: "What is Hallo?",
options: ["Hello", "Goodbye", "Book", "Teacher"],
answer: "Hello"
},
{
question: "What is Guten Morgen?",
options: [
"Good Morning",
"Good Night",
"Hello",
"Thank You"
],
answer: "Good Morning"
},
{
question: "What is Adiós?",
options: [
"Goodbye",
"Hello",
"Friend",
"Book"
],
answer: "Goodbye"
},
{
question: "What is Au revoir?",
options: [
"Goodbye",
"Hello",
"Food",
"Teacher"
],
answer: "Goodbye"
}
];
// =============================
// QUIZ SYSTEM
// =============================
let currentQuestion = 0;
let score = 0;

function loadQuestion() {
if (
currentQuestion >=
quizQuestions.length
) {
showFinalResult();
return;
}
const q =
quizQuestions[currentQuestion];
document.getElementById(
"question"
).textContent = q.question;
let html = "";
q.options.forEach(option => {
html += `
 <label>
 <input
 type="radio"
 name="quiz"
 value="${option}">
${option}
 </label>
 `;
});
document.getElementById(
"options"
).innerHTML = html;
}
function nextQuestion() {
const selected =
document.querySelector(
'input[name="quiz"]:checked'
);
if (!selected) {
alert(
"Please select an answer"
);
return;
}
if (
selected.value ===
quizQuestions[currentQuestion].answer
) {
score++;
document.getElementById(
"quizResult"
).textContent =
" Correct";
increaseProgress();
} else {
document.getElementById(
"quizResult"
).textContent =
" Wrong";
}
currentQuestion++;
setTimeout(() => {
document.getElementById(
"quizResult"
).textContent = "";
loadQuestion();
}, 1000);
}
function showFinalResult() {
const percentage =
Math.round(
(score / quizQuestions.length)
* 100
);
7
document.getElementById(
"accuracy"
).textContent =
percentage + "%";
document.getElementById(
"quizSection"
).innerHTML = `
 <h2> Quiz Completed!</h2>
 <h3>
 Score:
${score}/${quizQuestions.length}
 </h3>
 <p>
 Accuracy:
${percentage}%
 </p>
 <button
 class="btn"
 onclick="location.reload()">
 Restart Quiz
 </button>
 `;
updateBadges();
}
// =============================
// PROGRESS SYSTEM
// =============================
let progress =
Number(
localStorage.getItem(
"progress"
)
) || 0;
function increaseProgress() {
progress += 10;
8
if (progress > 100) {
progress = 100;
}
localStorage.setItem(
"progress",
progress
);
updateProgressUI();
}
function updateProgressUI() {
document.getElementById(
"progressFill"
).style.width =
progress + "%";
document.getElementById(
"progressText"
).textContent =
progress + "% Completed";
}
// =============================
// STREAK
// =============================
let streak =
Number(
localStorage.getItem(
"streak"
)
) || 1;
document.getElementById(
"streak"
).textContent =
streak + " Day";
document.getElementById(
"learned"
).textContent =
progress + " Words";
// =============================
9
// BADGES
// =============================
function updateBadges() {
let badge =
" Beginner";
if (score >= 5) {
badge =
" Intermediate";
}
if (score >= 8) {
badge =
" Expert";
}
document.getElementById(
"badges"
).textContent =
badge;
}
// =============================
// START APP
// =============================
loadCard();
loadQuestion();
updateProgressUI();