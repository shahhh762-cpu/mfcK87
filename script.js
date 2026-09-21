(function(){
  var PHONE = "79280024292";

  /* ---------- roster ---------- */
  // [фамилия, имя, позиция, код, номер, линия, состав]
  var R = [
    ["Лабазанов","Дени","Вратарь","врт",98,"gk","main"],
    ["Угазаев","Расул","Правый защитник","пз",66,"def","main"],
    ["Гациев","Умар","Центральный защитник","цз",17,"def","main"],
    ["Генардукаев","Асхаб","Центральный защитник","цз",22,"def","main"],
    ["Подколзин","Руслан","Левый защитник","лз",16,"def","main"],
    ["Зиндаки","Саид","Опорный полузащитник","оп",6,"mid","main"],
    ["Гамаев","Изнаур","Центральный полузащитник","цп",13,"mid","main"],
    ["Адаев","Малик","Центральный полузащитник","цп",8,"mid","main"],
    ["Бахухаджиев","Маьхди","Правый вингер","пв",10,"fwd","main"],
    ["Алханов","Равил","Центральный форвард","фрд",9,"fwd","main"],
    ["Ахмадов","Асхаб","Левый вингер","лв",7,"fwd","main"],

    ["Халадов","Дени","Правый защитник","пз",66,"def","sub"],
    ["Магомаев","Ахмад","Центральный защитник","цз",4,"def","sub"],
    ["Аль-Матари","Ахмад","Центральный защитник","цз",27,"def","sub"],
    ["Эльмурзаев","Юнус","Левый защитник","лз",18,"def","sub"],
    ["Дакаев","Мохмад","Опорный полузащитник","оп",28,"mid","sub"],
    ["Юсупов","Сахаб","Центральный полузащитник","цп",77,"mid","sub"],
    ["Геримханов","Адам","Центральный полузащитник","цп",11,"mid","sub"],
    ["Гадио","Абдула","Центральный полузащитник","цп",67,"mid","sub"],
    ["Балгаев","Ислам","Правый вингер","пв",14,"fwd","sub"],
    ["Элисбаев","Ясин","Центральный форвард","цфд",95,"fwd","sub"],
    ["Медаев","Ибрахим","Левый вингер","лв",19,"fwd","sub"]
  ];

  /* ---------- pitch (основа) ---------- */
  // порядок в R -> координаты [x%, y%]
  var P = {
    "Лабазанов":[50,90], "Подколзин":[13,74], "Генардукаев":[37.5,74], "Гациев":[62.5,74], "Угазаев":[87,74],
    "Зиндаки":[50,57], "Гамаев":[27,39], "Адаев":[73,39],
    "Ахмадов":[18,15], "Алханов":[50,12], "Бахухаджиев":[81,15]
  };
  var pitch = document.getElementById("pitch");
  R.forEach(function(p){
    if(p[6] !== "main") return;
    var c = P[p[0]]; if(!c) return;
    var d = document.createElement("div");
    d.className = "pl" + (p[5] === "gk" ? " gk" : "");
    d.style.left = c[0] + "%"; d.style.top = c[1] + "%";
    d.innerHTML = '<div class="n">' + p[4] + '</div><div class="s">' + p[0] + '</div>';
    pitch.appendChild(d);
  });

  /* ---------- catalog ---------- */
  var FILTERS = [
    ["all","Все"],["main","Основа"],["sub","Запасные"],
    ["gk","Вратари"],["def","Защитники"],["mid","Полузащитники"],["fwd","Нападающие"]
  ];
  var state = "all";
  var fbox = document.getElementById("filters");
  var grid = document.getElementById("grid");
  var count = document.getElementById("count");

  function plural(n){
    var a = n % 10, b = n % 100;
    if(a === 1 && b !== 11) return "игрок";
    if(a >= 2 && a <= 4 && (b < 12 || b > 14)) return "игрока";
    return "игроков";
  }
  function match(p){
    if(state === "all") return true;
    if(state === "main" || state === "sub") return p[6] === state;
    return p[5] === state;
  }
  function render(){
    var list = R.filter(match);
    grid.innerHTML = list.map(function(p){
      var main = p[6] === "main";
      return '<article class="pcard ' + (main ? "main" : "sub") + '">' +
        '<div class="top"><div class="num">' + p[4] + '</div><span class="tag">' + (main ? "Основа" : "Запасной") + '</span></div>' +
        '<div class="info"><div class="sn">' + p[0] + '</div><div class="fn">' + p[1] + '</div>' +
        '<div class="pos"><i>' + p[3] + '</i><span>' + p[2] + '</span></div></div></article>';
    }).join("");
    count.textContent = list.length + " " + plural(list.length);
    Array.prototype.forEach.call(fbox.children, function(b){
      b.setAttribute("aria-pressed", b.dataset.f === state ? "true" : "false");
    });
  }
  FILTERS.forEach(function(f){
    var b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.dataset.f = f[0]; b.textContent = f[1];
    b.addEventListener("click", function(){ state = f[0]; render(); });
    fbox.appendChild(b);
  });
  render();

  /* ---------- trial signup ---------- */
  var dlg = document.getElementById("trial");
  var form = document.getElementById("trial-form");
  var err = document.getElementById("trial-err");
  var nameI = document.getElementById("f-name");
  var ageI = document.getElementById("f-age");

  function openDlg(){
    err.textContent = "";
    if(dlg && dlg.showModal){ dlg.showModal(); setTimeout(function(){ nameI.focus(); }, 50); }
    else { window.open("https://wa.me/" + PHONE, "_blank"); }
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-trial]"), function(a){
    a.addEventListener("click", function(e){ e.preventDefault(); openDlg(); });
  });
  document.getElementById("trial-close").addEventListener("click", function(){ dlg.close(); });
  dlg.addEventListener("click", function(e){ if(e.target === dlg) dlg.close(); });

  function years(n){
    var a = n % 10, b = n % 100;
    if(a === 1 && b !== 11) return "год";
    if(a >= 2 && a <= 4 && (b < 12 || b > 14)) return "года";
    return "лет";
  }
  form.addEventListener("submit", function(e){
    e.preventDefault();
    var name = nameI.value.trim();
    var age = parseInt(ageI.value, 10);
    if(!name){ err.textContent = "Введите имя."; nameI.focus(); return; }
    if(!age){ err.textContent = "Введите возраст."; ageI.focus(); return; }
    if(age < 15){ err.textContent = "В команду принимаем с 15 лет."; ageI.focus(); return; }
    var text = "Здравствуйте! Хочу записаться на пробную тренировку в MFC K7. Меня зовут " + name + ", мне " + age + " " + years(age) + ".";
    var url = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(text);
    var w = window.open(url, "_blank", "noopener");
    if(!w){ window.location.href = url; }
    dlg.close();
  });
})();
