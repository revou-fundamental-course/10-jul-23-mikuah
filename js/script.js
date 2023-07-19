// Get the input elements
const ageInput = document.getElementById("age");
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const genderInput = document.querySelectorAll('input[name="gender"]');
const validatedInputs = document.querySelectorAll('input[type="number"]');
const resultNum = document.getElementById("res-num");
const resultText = document.getElementById("res-text");
const resultSubText = document.getElementById("res-sub-text");
const forGender = document.getElementById("for-gender");
const calculateBtn = document.getElementById("calculate");
const resetBtn = document.getElementById("reset");

// Add event listener for input validation on input
validatedInputs.forEach((validatedInput) => {
  validatedInput.addEventListener("input", ValidateInputs);
});

function ValidateInputs() {
  ValidateInput(ageInput); // Validate the input
  ValidateInput(weightInput);
  ValidateInput(heightInput);
}

function ValidateInput(input) {
  if (isNaN(input.value) || input.value <= "0") {
    input.style.border = "2px solid red"; // Set the border to red if the input is NaN or less than or equal to zero
  } else {
    input.style.border = "2px solid black"; // Set the border to black if the input is valid
  }
}

// Add event listener for calculate button
calculateBtn.addEventListener("click", CalculateBMI);

// Function to calculate BMI
function CalculateBMI() {
  const age = ageInput.value; // Get the value of the age, weight and height input
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value) / 100;

  if (isNaN(age) || age <= 0 || isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
    // Check if any of the inputs are NaN, zero, or empty
    document.getElementById("message").textContent =
      "*Ada masalah dengan inputan Anda!";

    if (isNaN(age) || age <= 0) {
      ageInput.style.borderColor = "red"; // Set the border color of the input to red if it's invalid
    } else {
      ageInput.style.borderColor = "black"; // Set the border color of the input to black if it's valid
    }

    if (isNaN(weight) || weight <= 0) {
      weightInput.style.borderColor = "red";
    } else {
      weightInput.style.borderColor = "black";
    }

    if (isNaN(height) || height <= 0) {
      heightInput.style.borderColor = "red";
    } else {
      heightInput.style.borderColor = "black";
    }

    return;
  }

  for (const gender of genderInput) {
    if (gender.checked) {
      if (gender.value == "male") {
        forGender.textContent = "BMI untuk Laki-laki"; // Display gender text
      } else {
        forGender.textContent = "BMI untuk Perempuan";
      }
    }
  }

  const bmi = weight / (height * height); // Calculate the BMI value

  if (bmi) {
    min = 18.4 * height * height; // Calculate the minimum and maximum ideal weight
    max = 24.9 * height * height;
  }

  //display result text
  resultNum.textContent = `${bmi.toFixed(1)}`; // Display the BMI value

  if (bmi < 18.5) {
    resultText.textContent = `Berat Rendah`;
    resultSubText.textContent = `Berat ideal Anda adalah ${min.toFixed(1)} - ${max.toFixed(1)} kg.`;
    resultNum.style.color = "red"
    document.getElementById("underweight").style.display = "block";
    calculateBtn.style.display = "none";
  }
  else if (bmi < 24.9) {
    resultText.textContent = `Normal (Ideal)`;
    resultSubText.textContent =
      `Pertahankan berat anda di ${min.toFixed(1)} - ${max.toFixed(1)} kg.`;
      resultNum.style.color = "green"
    document.getElementById("normal").style.display = "block";
    calculateBtn.style.display = "none";
  }
  else if (bmi < 29.9) {
    resultText.textContent = `Berat Berlebih`;
    resultSubText.textContent =
      `Berat ideal Anda adalah ${min.toFixed(1)} - ${max.toFixed(1)} kg.`;
      resultNum.style.color = "orange"
    document.getElementById("overweight").style.display = "block";
    calculateBtn.style.display = "none";
  }
  else {
    resultText.textContent = `Obesitas`;
    resultSubText.textContent =
    `Berat ideal Anda adalah ${min.toFixed(1)} - ${max.toFixed(1)} kg.`;
    resultNum.style.color = "red"
    document.getElementById("overweight").style.display = "block";
    calculateBtn.style.display = "none";
  }
}

// Add event listener for reset button
resetBtn.addEventListener("click", Reset);

function Reset() {
  location.reload(); // Reload the page to reset the form
}
