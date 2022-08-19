//choose all table rows
//in each table row loop through checkboxes
//if a checkbox is clicked
//uncheck every other checkbox

function listenToCheckboxes() {
    let rows = document.querySelectorAll(".table .container.row");
    Array.from(rows).forEach((row) => {

        let checkboxes = row.querySelectorAll("[type='checkbox']");
        let divBox = row.querySelector("[contenteditable]");
        let selected = '';

        Array.from(checkboxes).forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    selected = checkbox;
                    console.log(`${selected.className} was checked`);
                    Array.from(checkboxes).forEach((checkbox) => {
                        uncheckChecked(checkbox, selected);
                    });
                    toggleDivEditable(checkbox, divBox);
                } else {
                    console.log(`${selected.className} unchecked`);
                    toggleDivEditable(checkbox, divBox);
                }
            });
        });
    });
}

function uncheckChecked(checkbox, selected) {
    if (checkbox.checked && checkbox.className != selected.className) {
        console.log(`${checkbox.className} is also checked, unchecking!`);
        checkbox.checked = false;
    }
}


let nIntervId;

function updateButton() {
  // check if an interval has already been set up
  if (!nIntervId) {
    nIntervId = setInterval(allowBtn, 100);
  }
}

function toggleDivEditable(checkbox, divBox) {
    divBox.textContent = "";
    if (checkbox.checked && checkbox.className != "taip") {
        divBox.setAttribute("contenteditable", true);
        console.log("yes");
    } else {
        divBox.setAttribute("contenteditable", false);
        console.log("no");
    }
}

//check if all divs are filled
//get all divs which are set to true
//get total item number
//itterate and check box content
//if all boxes contain at least one item and not space
//all good
//else fasle


function textFilled() {
    let divs = document.querySelectorAll('[contenteditable="true"]');
    let emptyDivs = Array.from(divs).filter(div => div.textContent.replace(' ', '').length < 1);
    return (emptyDivs.length >= 1) ? false : true;
}

//loop throug every row,
//loop through every check box
//if button checked - good
//else bad

function missingCheckbox() {
    let missing = false;
    let checkboxes = document.querySelectorAll('.checkbox-group');

    Array.from(checkboxes).forEach((group) => {
        let checkboxArray = group.querySelectorAll('[type="checkbox"]');
        let checked = Array.from(checkboxArray).filter(c => c.checked);
        if (checked.length == 0) {
            missing = true;
            return;
        }
    });
    return missing;
}

function allowBtn() {
    
        let btn = document.querySelector('.finish-button');
        if (missingCheckbox() == false && textFilled() == true) {
            btn.disabled = false;
        }
        else {
            btn.disabled = true;
        }
  
}

function printPage() {
    let btn = document.querySelector('.finish-button');
    btn.addEventListener('click', () => {
        window.print();
    });
}

listenToCheckboxes();
printPage();
updateButton();

//for each checkbox add event listener
//check if checked or unchecked
//check if other boxes are checked in same row
//if yes make it unchecked