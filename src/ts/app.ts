

let Enhanced_select = <HTMLSelectElement> document.getElementById("enhanced_select");
let eSelect = eselect(Enhanced_select);

function eselect(eselect: HTMLSelectElement): void
{
    // console.log("Hey");
    
    var SPLITTER = "<->";
    var CHARLIMIT = 10;
    var SORT = true;

    init();

    function init(): void
    {
        var parentDiv: HTMLDivElement, selectedLabel: HTMLLabelElement, oInput: HTMLInputElement, hiddenInput: HTMLInputElement, selectedSpan: HTMLSpanElement;

        generate();
        initListeners();

        function generate(): void
        {
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
    
            eselect.parentNode?.insertBefore(parentDiv, eselect);
            parentDiv.appendChild(selectedLabel);
            parentDiv.appendChild(eselect);
            parentDiv.appendChild(hiddenInput);
        }

        function initListeners(): void 
        {
            oInput.addEventListener("keydown", inputChanged)
            eselect.addEventListener("change", selectChanged);
            let has_Other_option: boolean = false;
            let optionsArray: HTMLOptionElement[] = Array.from(eselect.options);
            let option: HTMLOptionElement;

            for  (option of optionsArray){
                if(option.textContent == 'other' && option.value == 'other')
                {
                    has_Other_option = true;
                    option.classList.add("es_other_option")
                    break;
                }
                if(option.textContent == 'others' || option.textContent == 'Other' || option.textContent == 'Others')
                {
                    has_Other_option = true;
                    option.value = 'other';
                    option.textContent = 'other';
                    option.className = 'es_other_option';
                    break;
                }
            }

            if(!has_Other_option)
            {
                const otherOption: HTMLOptionElement = document.createElement('option');
                otherOption.value = 'other';
                otherOption.textContent = 'other';
                eselect.appendChild(otherOption);
            }
        }

        function selectChanged()
        {
    
            if(eselect.value == "other")
            {
                parentDiv.appendChild(oInput);
            }
            else 
            {
                if (oInput !== null) {
                    oInput.remove();
                } 
            
                if(eselect.value != "none")
                {
                    const eselect_value: string = eselect.value;
                    eselect.remove(eselect.selectedIndex);
                    appendTag(eselect_value,"select");
                }
            }
        }

        function inputChanged(event: KeyboardEvent)
        {
            if (event.key === 'Enter') {

                const inputValue = oInput.value.trim();
                if(inputValue != "")
                {
                    appendTag(inputValue,"input");
                }
                else 
                {
                }
                oInput.value = "";
            }
        }
        function appendTag(appendValue: string,tag: string)
        {

            let eSpan: HTMLSpanElement = document.createElement("span");
            eSpan.className = "es_selector_badge";

            let eSpan_text: string = appendValue;
            let tagval: string = "";
            let eString: string = hiddenInput.value;
            
            let spanCloser: HTMLSpanElement = document.createElement("span");
            spanCloser.className = "span_closer";
            spanCloser.textContent = "x";
            spanCloser.addEventListener("click",() =>
            {
                eClose(eSpan);
            })

            if (appendValue.length > CHARLIMIT)
            {
                eSpan_text = appendValue.substring(0, CHARLIMIT)+"...";
            }

            eSpan.title = appendValue;
            eSpan.textContent = eSpan_text;
            eSpan.appendChild(spanCloser);
            selectedSpan.appendChild(eSpan);

            if (tag == "input")
            {
                tagval = "*O*"
            }
            if (eString == "")
            {
                eString = tagval + appendValue;
                hiddenInput.value = eString;
            }

            else 
            {
                eString = eString + SPLITTER + tagval + appendValue;
                hiddenInput.value = eString;
            }    
        }

        function eClose(eSpan : HTMLSpanElement)
        {
            var eString: string = hiddenInput.value;
            var parentValue: string = eSpan.title;
            //have to migrate to ts from here
            var parentValueo: string = "*O*" + parentValue;
            eSpan.remove();
            var eStringsArray: string[] = eString.split(SPLITTER);
            let indexToRemove: number = eStringsArray.indexOf(parentValueo);

            if(indexToRemove == -1)
            {
                indexToRemove = eStringsArray.indexOf(parentValue);
                const option: HTMLOptionElement = document.createElement("option");
                option.text = parentValue;
                eselect.add(option);
            }

            eStringsArray.splice(indexToRemove, 1);
            eString = eStringsArray.join(SPLITTER);
            hiddenInput.value = eString;
        }
    }

}
