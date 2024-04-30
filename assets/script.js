import {Get,Set} from "./LocalStorage.js";

let grp = [];

let buttonAdd = (e) => {
    let t = document.getElementById("inputTask");
    let d = document.getElementById("Date");
    if (t.value != null && d.value != null && t.value != "" && d.value != "") {
        grp = Get("todolist", []);
        grp.push({ text: t.value, value: "0", date: d.value });
        t.value = "";
        Set("todolist", grp);
        refresh();
    }
}

let CheckIn = (e) => {
    grp = Get("todolist", []);
    console.log(e.target.value, grp[e.target.id])
    grp[e.target.id].value = e.target.value;
    Set("todolist", grp);
    refresh();
}

let RemoveItem = (e) => {
    grp = Get("todolist", []);
    grp.splice(e.target.id, 1);
    Set("todolist", grp);
    refresh();
}

function refresh() {
    grp = Get("todolist", [])

    let list = document.getElementById("ToDoList");
    list.innerHTML = "";

    let i = 0;
    for (const x of grp) {
        AddElements(x, i);
        i++;
    }

    //document.documentElement.style.setProperty('--ma-couleur', 'rgb(' + parseInt(Math.random() * 255) + ',0,0)');
}

function AddElements(Items, id) {
    let list = document.getElementById("ToDoList");

    let _tr = document.createElement("tr");
    let _th = document.createElement("th");
    _th.scope = "row";
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");

    let slt = document.createElement("select");
    let op1 = document.createElement("option");
    let op2 = document.createElement("option");
    let op3 = document.createElement("option");
    slt.appendChild(op1);
    slt.appendChild(op2);
    slt.appendChild(op3);
    op1.textContent = "Waiting";
    op2.textContent = "Work in progress";
    op3.textContent = "Done";
    op1.value = "0";
    op2.value = "1";
    op3.value = "2";
    slt.addEventListener('change', CheckIn)
    slt.value = Items.value;
    slt.id = id;

    _tr.style = Items.value == "1" ? "background: rgb(255,255,0,0.3)" : Items.value == "2" ? "background: rgb(0,255,0,0.3)" : "background: none"


    let btn = document.createElement("button")


    btn.textContent = "X";
    btn.id = id;
    btn.addEventListener('click', RemoveItem);

    _th.textContent = Items.date;
    td1.textContent = Items.text;


    td3.appendChild(btn);
    td2.appendChild(slt);

    _tr.appendChild(_th);
    _tr.appendChild(td1);
    _tr.appendChild(td2);
    _tr.appendChild(td3);
    list.appendChild(_tr);
}




let btn = document.getElementById("buttonTask");
btn.addEventListener('click', buttonAdd);

refresh();

