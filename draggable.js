
console.log("Hello Draggable");

function dragStartHandler(ev) {
    ev.dataTransfer.setData("text/elementId", ev.target.id); // set the data for our target to be the ID so we can grab the element late
}

function dragoverHandler(ev) {
    ev.preventDefault(); // by default this event is ignored so we have to prevent the default action
    ev.dataTransfer.dropEffect = "move"; // set to 'move' since we plan on moving the item
}

function dropHandler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/elementId");
    let dragContainer = ev.target;
    let empties = Array.from(dragContainer.getElementsByClassName("placeholder"));
    while(empties.length == 0) {
        dragContainer = dragContainer.parentElement;
        empties = Array.from(dragContainer.getElementsByClassName("placeholder"));
    }

    if (empties.length > 0) {
        const dragged = document.getElementById(data);
        empties[0].replaceWith(dragged);
    }

    replenishEmpties(document.getElementById("draggables-container"), 7);
    let dragBoxes = Array.from(document.getElementsByClassName("drag-landing-box"));
    dragBoxes.forEach(element => {
        replenishEmpties(element, 3);
    });
}

function replenishEmpties(element, max)
{
    if (element.childElementCount < max) {
        const placeholder = document.createElement("div");
        placeholder.classList.add("placeholder");
        element.appendChild(placeholder);
    }
}
