"use strict";
let Enhanced_select = document.getElementById("enhanced_select");
let eSelect = eselect(Enhanced_select);
function eselect(eselect) {
    // console.log("Hey");
    var SPLITTER = "<->";
    var CHARLIMIT = 10;
    var SORT = true;
    init();
    function init() {
        var parentDiv, selectedLabel, oInput, hiddenInput, selectedSpan;
        generate();
        initListeners();
        function generate() {
            var _a;
            eselect.classList.add('eselect');
            parentDiv = document.createElement('div');
            parentDiv.classList.add('es_parent');
            selectedLabel = document.createElement('label');
            selectedLabel.className = 'es_selected_label';
            selectedSpan = document.createElement('span');
            selectedSpan.className = "es_selected";
            selectedLabel.append(selectedSpan);
            oInput = document.createElement('input');
            oInput.type = 'text';
            oInput.className = 'es_other_input';
            oInput.placeholder = 'Type the other option and press enter';
            hiddenInput = document.createElement('input');
            hiddenInput.className = 'es_hidden_input';
            hiddenInput.type = 'text';
            (_a = eselect.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(parentDiv, eselect);
            parentDiv.appendChild(selectedLabel);
            parentDiv.appendChild(eselect);
            parentDiv.appendChild(hiddenInput);
        }
        function initListeners() {
            oInput.addEventListener("keydown", inputChanged);
            eselect.addEventListener("change", selectChanged);
            let has_Other_option = false;
            let optionsArray = Array.from(eselect.options);
            let option;
            for (option of optionsArray) {
                if (option.textContent == 'other' && option.value == 'other') {
                    has_Other_option = true;
                    option.classList.add("es_other_option");
                    break;
                }
                if (option.textContent == 'others' || option.textContent == 'Other' || option.textContent == 'Others') {
                    has_Other_option = true;
                    option.value = 'other';
                    option.textContent = 'other';
                    option.className = 'es_other_option';
                    break;
                }
            }
            if (!has_Other_option) {
                const otherOption = document.createElement('option');
                otherOption.value = 'other';
                otherOption.textContent = 'other';
                eselect.appendChild(otherOption);
            }
        }
        function selectChanged() {
            if (eselect.value == "other") {
                parentDiv.appendChild(oInput);
            }
            else {
                if (oInput !== null) {
                    oInput.remove();
                }
                if (eselect.value != "none") {
                    const eselect_value = eselect.value;
                    eselect.remove(eselect.selectedIndex);
                    appendTag(eselect_value, "select");
                }
            }
        }
        function inputChanged(event) {
            if (event.key === 'Enter') {
                const inputValue = oInput.value.trim();
                if (inputValue != "") {
                    appendTag(inputValue, "input");
                }
                else {
                }
                oInput.value = "";
            }
        }
        function appendTag(appendValue, tag) {
            let eSpan = document.createElement("span");
            eSpan.className = "es_selector_badge";
            let eSpan_text = appendValue;
            let tagval = "";
            let eString = hiddenInput.value;
            let spanCloser = document.createElement("span");
            spanCloser.className = "span_closer";
            spanCloser.textContent = "x";
            spanCloser.addEventListener("click", () => {
                eClose(eSpan);
            });
            if (appendValue.length > CHARLIMIT) {
                eSpan_text = appendValue.substring(0, CHARLIMIT) + "...";
            }
            eSpan.title = appendValue;
            eSpan.textContent = eSpan_text;
            eSpan.appendChild(spanCloser);
            selectedSpan.appendChild(eSpan);
            if (tag == "input") {
                tagval = "*O*";
            }
            if (eString == "") {
                eString = tagval + appendValue;
                hiddenInput.value = eString;
            }
            else {
                eString = eString + SPLITTER + tagval + appendValue;
                hiddenInput.value = eString;
            }
        }
        function eClose(eSpan) {
            var eString = hiddenInput.value;
            var parentValue = eSpan.title;
            //have to migrate to ts from here
            var parentValueo = "*O*" + parentValue;
            eSpan.remove();
            var eStringsArray = eString.split(SPLITTER);
            let indexToRemove = eStringsArray.indexOf(parentValueo);
            if (indexToRemove == -1) {
                indexToRemove = eStringsArray.indexOf(parentValue);
                const option = document.createElement("option");
                option.text = parentValue;
                eselect.add(option);
            }
            eStringsArray.splice(indexToRemove, 1);
            eString = eStringsArray.join(SPLITTER);
            hiddenInput.value = eString;
        }
    }
}
