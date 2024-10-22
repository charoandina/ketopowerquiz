/* QUIZ */

let intro = document.getElementById('intro');
let quiz = document.getElementById('quiz');
let gender = document.getElementById('gender-question');
let body = document.getElementById('body-question');
let age = document.getElementById('age-question');
let motivation = document.getElementById('motivation-question');
let training = document.getElementById('training-question');
let calculating = document.getElementById('calculating');
let report = document.getElementById('report');
let productInfo = document.getElementById('product-info');
let daysNeededOutput = document.getElementById('days-needed');


function showQuiz () {
    intro.classList.add('hidden');
    quiz.classList.remove('hidden');
}

function bodyQuestion(){
    gender.classList.add('hidden');
    body.classList.remove('hidden');
}

function ageQuestion(){
    body.classList.add('hidden');
    age.classList.remove('hidden');
}

function motivationQuestion(){
    age.classList.add('hidden');
    motivation.classList.remove('hidden');
}

function trainingQuestion(){
    motivation.classList.add('hidden');
    training.classList.remove('hidden');
    calculateMetabolicAge();
}

function showCalculating() {
    quiz.classList.add('hidden');
    training.classList.add('hidden');
    calculating.classList.remove('hidden');

    const paragraphs = document.querySelectorAll('.generating-report p');
    
    setTimeout(() => {
        paragraphs[0].classList.remove('hidden');
    }, 3000);

    setTimeout(() => {
        paragraphs[1].classList.remove('hidden');
    }, 6000);

    setTimeout(() => {
        calculating.classList.add('hidden'); 
        report.classList.remove('hidden');    
        productInfo.classList.remove('hidden'); 
    }, 9000);
}

// INCREMENT NUMBER PROGRESS

let currentStep = 1; 
const totalSteps = 5; 

function incrementProgress() {
    const progressElement = document.querySelector('.quiz-progress h3');
    const progressBar = document.querySelector('.progress-bar');

    if (currentStep < totalSteps) {
        currentStep++;
        
        progressElement.textContent = `${currentStep} / ${totalSteps}`;
        
        const progressPercentage = (currentStep / totalSteps) * 100;
        progressBar.style.background = `linear-gradient(to right, #ffffff ${progressPercentage}%, transparent ${progressPercentage}%)`;
    }
}

// VALIDATE INPUTS 
// Body 
function validateInputs() {  
const weight = parseFloat(document.getElementById('weight').value); // Obtain and convert the value of the weight input to a number
const targetWeight = parseFloat(document.getElementById('target-weight').value); // Obtain and convert the value of the target weight input to a number  
const height = document.getElementById('height').value; // Get the height input value

    // Check if there are any empty fields
    if (weight === '' || targetWeight === '' || height === '') {  
        alert('Please fill in all fields before continuing.');  
        return; 
    }  

    // Target Weight cannot be higher than weight  
    if (targetWeight > weight) {  
        alert('Target weight cannot be greater than current weight.');
        return; 
    }  

    ageQuestion(); 
    incrementProgress(); 
}  

// Age 
function validateAgeInput(){
    const age = document.getElementById('age').value;

    if (age === '') {
        alert('Please fill in all fields before continuing.');
        return;
    } else
    motivationQuestion();
    incrementProgress();
}

// REPORT VALUES

// Get Age
document.getElementById('age').addEventListener('input', function() {
    const ageValue = this.value;
    const targetSpans = document.querySelectorAll('.age-value');

    targetSpans.forEach(span => {
        span.textContent = ageValue;
    });
});

//Get Weight
document.getElementById('weight').addEventListener('input', function() {
    const weightValue = this.value;
    const targetSpans = document.querySelectorAll('.weight-value');

    targetSpans.forEach(span => {
        span.textContent = weightValue;
    });
});

//Get Target Weight
document.getElementById('target-weight').addEventListener('input', function() {
    const targetWeightValue = this.value;
    const targetSpans = document.querySelectorAll('.targetweight-value');

    targetSpans.forEach(span => {
        span.textContent = targetWeightValue;
    });
});

//Get Height
document.getElementById('height').addEventListener('input', function() {
    const heightValue = this.value;
    const targetSpans = document.querySelectorAll('.height-value');

    targetSpans.forEach(span => {
        span.textContent = heightValue;
    });
});

//Get Gender

let selectedGender = '';

function selectGender(imageSrc, gender) {
    const genderImage = document.querySelector('.gender-value');
    genderImage.src = imageSrc;

    selectedGender = gender;
}

//Get Motivation Level
let selectedMotivation = ''; 

function selectMotivation(level) {
    selectedMotivation = level === 'low' ? 1 : level === 'medium' ? 2 : 3;
    console.log("Selected training level: " + selectedMotivation);
}

// Get Training Level
let selectedTraining = '';

function selectTraining(level) {
    selectedTraining = level === 'low' ? 1 : level === 'medium' ? 2 : 3;
    console.log("Selected training level: " + selectedTraining);
}


//Get Actual Date
const today = new Date();

const options = { month: 'long',day: 'numeric', year: 'numeric'  };
const formattedDate = today.toLocaleDateString('en-US', options);

document.querySelector('.today').textContent = formattedDate;

//Days needed
const weightInput = document.getElementById('weight');
const targetWeightInput = document.getElementById('target-weight');
let estimatedDateOutputs = document.querySelectorAll('.estimated-date');

function calculateDays() {
    const weight = parseFloat(weightInput.value);
    const targetWeight = parseFloat(targetWeightInput.value);

    if (weight >= targetWeight) {
        const weightDifference = weight - targetWeight;
        const dailyLoss = 0.38;

        const daysNeeded = Math.ceil(weightDifference / dailyLoss);
        daysNeededOutput.textContent = `${daysNeeded}`;

        const today = new Date();
        const estimatedDate = new Date(today);
        estimatedDate.setDate(today.getDate() + daysNeeded);

        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = estimatedDate.toLocaleDateString('en-US', options);

        estimatedDateOutputs.forEach(span => {
            span.textContent = formattedDate;
        });
    } else {
        daysNeededOutput.textContent = "The current weight must be greater than or equal to the target weight.";
        
        estimatedDateOutputs.forEach(span => {
            span.textContent = ""; 
        });
    }
}

weightInput.addEventListener('input', calculateDays);
targetWeightInput.addEventListener('input', calculateDays);


// BMI
function setActiveCategory(category) {
    document.getElementById('normal').classList.remove('active-bmi');
    document.getElementById('overweight').classList.remove('active-bmi');
    document.getElementById('obese').classList.remove('active-bmi');

    document.getElementById(category).classList.add('active-bmi');
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);



    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters * heightInMeters);

    document.querySelector('.bmi-result').textContent = `${bmi.toFixed(2)}`;

    let category;
    if (bmi < 25) {
        category = 'normal';
    } else if (bmi < 30) {
        category = 'overweight';
    } else {
        category = 'obese';
    }

    setActiveCategory(category);
}


// METABOLIC AGE

function calculateMetabolicAge() {
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const gender = selectedGender; 
    const trainingLevel = selectedTraining; 
    const motivationLevel = selectedMotivation;

    if (isNaN(age) || isNaN(weight) || isNaN(height) || !gender || !trainingLevel || !motivationLevel) {
        return;
    }

    let metabolicAge;

    if (gender === 'masculine') {
        metabolicAge = (age + (0.23 * weight) + (0.11 * height)) - (15.5 * trainingLevel);
    } else {
        metabolicAge = (age + (0.20 * weight) + (0.10 * height)) - (15.3 * trainingLevel);
    }


    if (motivationLevel === 'high') {
        metabolicAge -= 5; 
    } else if (motivationLevel === 'low') {
        metabolicAge += 1; 
    }

    document.getElementById('metabolic-age').textContent = `${Math.round(metabolicAge)}`;
}


// SCROLL TO PRODUCT INFO

const buttons = document.querySelectorAll('.scroll-button');
const productInfoScroll = document.getElementById('product-info');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        productInfoScroll.scrollIntoView({ behavior: 'smooth' });
    });
});