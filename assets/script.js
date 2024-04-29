let grp = [];

let buttonAdd = (e) => {
    let t = document.getElementById("inputTask");
    grp = Get("todolist", []);
    grp.push({ text: t.value, check: false });
    Set("todolist", grp);
    refresh();
}

let CheckIn = (e) => {
    grp = Get("todolist", []);
    grp[e.target.id].check = !grp[e.target.id].check;
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
        AddElements(x.text, x.check, i);
        i++;
    }
}

function AddElements(text, check, id) {
    let list = document.getElementById("ToDoList");

    let li = document.createElement("li")
    let btn = document.createElement("button")
    let txt = document.createElement("span")

    btn.textContent = "X";
    btn.id = id;
    btn.addEventListener('click', RemoveItem);

    txt.textContent = text;

    txt.id = id;
    txt.style = check ? "text-decoration:line-through red;" : "text-decoration: none;";
    txt.addEventListener('click', CheckIn);

    li.appendChild(btn);
    li.appendChild(txt);

    list.appendChild(li);
}

function Get(name, ini) {
    let data = localStorage.getItem(name);

    if (data !== null) {
        return JSON.parse(data);
    } else {
        localStorage.setItem(name, JSON.stringify(ini));
        return JSON.parse(localStorage.getItem(name));
    }
}

function Set(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
    return JSON.parse(localStorage.getItem(name));
}


let btn = document.getElementById("buttonTask");
btn.addEventListener('click', buttonAdd);

refresh();

