let bmiResult = "";

function generateBMI() {
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const feet = parseFloat(document.getElementById("feet").value);
    const inches = parseFloat(document.getElementById("inches").value);
    const weight = parseFloat(document.getElementById("weight").value);

    if (!age || !gender || isNaN(feet) || isNaN(inches) || isNaN(weight)) {
        alert("Please enter all fields!");
        return;
    }

    const heightInMeters = ((feet * 12) + inches) * 0.0254;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    let category = "";
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi < 24.9) {
        category = "Normal Weight";
    } else if (bmi < 29.9) {
        category = "Overweight";
    } else {
        category = "Obesity";
    }

    bmiResult = `Age: ${age} Years\nGender: ${gender}\nHeight: ${feet} feet ${inches} inches\nWeight: ${weight} Kg\nBMI Result: ${bmi} (${category})`;
    document.getElementById("result").innerText = bmiResult;
    document.getElementById("downloadBtn").style.display = "block";
}

function generatePDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Your BMI Details', 105, 30, null, null, 'center');

    // Separator line
    doc.setDrawColor(40, 167, 69);
    doc.setLineWidth(1.5);
    doc.line(50, 35, 160, 35);

    // User Input
    const details = bmiResult.split("\n");
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    let yPosition = 60;
    details.forEach(detail => {
        doc.text(detail, 20, yPosition);
        yPosition += 15;
    });

    // Left triangle design
    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(40, 167, 69);
    doc.triangle(10, 250, 40, 250, 10, 270, 'F');

    // Footer
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text('© Created by ARKA BARUA', 105, 290, null, null, 'center');

    // Save the PDF
    doc.save('BMI_Details.pdf');
}