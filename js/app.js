function mostrarJuegos(arrayGames, consolaInfo) {
  const gamesContainer = document.querySelector("#section_juegos_tienda");
  //LIMPIO EL CONTENEDOR PADRE
  gamesContainer.innerHTML = "";
  //CREO EL SEPARADOR, ASIGNO CLASES, INICIALIZO ATRIBUTOS Y RELACIONO LOS ELEMENTOS
  const separator = document.createElement("div");
  const imgSep1 = document.createElement("img");
  const imgSep2 = document.createElement("img");
  const textSep = document.createElement("h2");
  separator.classList.add(
    "mt-3",
    "mb-2",
    "h2_tienda",
    "d-flex",
    "justify-content-evenly"
  );
  separator.id = "ps3_games";
  imgSep1.src = consolaInfo[0].imgSepSrc;
  imgSep1.alt = consolaInfo[0].altImgSep;
  imgSep2.src = consolaInfo[0].imgSepSrc;
  imgSep2.alt = consolaInfo[0].altImgSep;
  textSep.innerText = consolaInfo[0].txtSep;
  separator.appendChild(imgSep1);
  separator.appendChild(textSep);
  separator.appendChild(imgSep2);
  gamesContainer.appendChild(separator);
  //RECORRE EL ARREGLO DE JUEGOS
  const childGamesContainer = document.createElement("div");
  for (const key in arrayGames) {
    //CREA LOS ELEMENTOS
    const divGame = document.createElement("div");
    const imgGame = document.createElement("img");
    const parrafo = document.createElement("p");
    // ASIGNA LAS CLASES E INICIALIZA ATRIBUTOS
    childGamesContainer.classList.add(
      "d-flex",
      "flex-wrap",
      "justify-content-start",
      "contenedor_portadas_tienda"
    );
    divGame.classList.add(
      "d-flex",
      "flex-wrap",
      "flex-column",
      "mb-3",
      "div_img_tienda"
    );
    const game = arrayGames[key];
    imgGame.classList.add("img_portadas");
    imgGame.src = game.imagenSrc;
    imgGame.alt = game.titulo;
    parrafo.innerHTML = `Género: ${game.genero} <br />
    Precio: ${game.precio} <br />`;
    //EMPARENTA LOS ELEMENTOS
    divGame.appendChild(imgGame);
    divGame.appendChild(parrafo);
    childGamesContainer.appendChild(divGame);
    asignarEventClickDetalles(divGame, game, consolaInfo);
  }
  gamesContainer.appendChild(childGamesContainer);
}

async function identificarConsola(btnid) {
  let consolaInfo = {};
  const juegosPorConsolaR = await fetch("./json/videojuegos.json");
  const juegosPorConsola = await juegosPorConsolaR.json();
  //IDENTIFICA QUE BOTON FUE PRESIONADO
  switch (btnid) {
    case "btnPS3":
      //ESPARCE LA PROPIEDAD EL OBJETO juegosPorConsola ADECUADA PARA LA SELECCION
      const arrayGamesPs3 = {
        ...juegosPorConsola.ps3,
      };
      ///CREA UN OBJETO CON LOS DATOS DE LA CONSOLA
      consolaInfo = {
        ...juegosPorConsola.logoPS3,
      };
      mostrarJuegos(arrayGamesPs3, consolaInfo);
      break;
    case "btnPS4":
      const arrayGamesPs4 = {
        ...juegosPorConsola.ps4,
      };
      consolaInfo = {
        ...juegosPorConsola.logoPS4,
      };
      mostrarJuegos(arrayGamesPs4, consolaInfo);
      break;
    case "btnXONE":
      const arrayGamesXONE = {
        ...juegosPorConsola.xone,
      };
      consolaInfo = {
        ...juegosPorConsola.logoXONE,
      };
      mostrarJuegos(arrayGamesXONE, consolaInfo);
      break;
  }
}
function asignarEventClickDetalles(divGame, game, consolaInfo) {
  const gameData = game;
  divGame.addEventListener("click", function () {
    cargarDetalles(gameData, consolaInfo);
  });
}
//FUNCION QUE CAMBIA EL CONTENIDO MAIN DEL HTML(SPA)
function cambiarPage(newPage) {
  const containerMain = document.querySelector("#mainContainer");
  containerMain.innerHTML = " ";
  containerMain.innerHTML = newPage;
}
//ESTAS FUNCIONES CONTIENEN EL HTML DE LAS SECCIONES DEL SITIO
function cargarTienda() {
  cambiarPage(`<div class="row">
  <!-- //MENU DE NAVEGACION IZQUIERDO -->
  <aside class="col-sm-2 col-md-1 p-0" id="div_aside_tienda">
    <nav class="p-0 fixed col-sm-2 col-md-1" id="nav_tienda">
      <ul
        class="d-flex flex-column align-items-center justify-content-center h-auto w-100 border border-dark p-0 m-0"
      >
        <li
          class="border-bottom border-dark w-100 list-unstyled text-center"
        >
          <button
            type="button"
            class="button_tienda_filtro"
            id="button_tienda_hamburger"
          >
            <img
              src="./assets/images/nav_icos/hamburger-menu-ico.svg"
              id="hamburger_tienda"
              alt="hamburger_ico"
            />
          </button>
        </li>
        <li
          class="border-bottom border-dark w-100 list-unstyled text-center li_tienda_menu"
        >
          <button type="button" id="btnPS4" class="button_tienda_filtro">
            PS4
          </button>
        </li>
        <li
          class="border-bottom border-dark w-100 list-unstyled text-center li_tienda_menu"
        >
          <button type="button" id="btnPS3" class="button_tienda_filtro">
            PS3
          </button>
        </li>
        <li
          class="border-bottom border-dark w-100 list-unstyled text-center li_tienda_menu"
        >
          <button type="button" id="btnXONE" class="button_tienda_filtro">
            XBOX ONE
          </button>
        </li>
      </ul>
    </nav>
  </aside>
  <section
    class="col-sm-10 col-md-11 d-flex flex-column align-items-center justify-content-center flex-wrap"
    id="section_juegos_tienda"
  ></section>
</div>`);

  const btnPS3 = document.querySelector("#btnPS3");
  btnPS3.addEventListener("click", function () {
    identificarConsola(btnPS3.id);
  });

  const btnPS4 = document.querySelector("#btnPS4");
  btnPS4.addEventListener("click", function () {
    identificarConsola(btnPS4.id);
  });

  const btnXONE = document.querySelector("#btnXONE");
  btnXONE.addEventListener("click", function () {
    identificarConsola(btnXONE.id);
  });
}
function cargarIndex() {
  cambiarPage(`    <div class="row">
<div
  class="col-12 d-flex justify-content-center align-items-center"
  id="div_index_title"
>
  <h1 id="h1_index">DARK GAMES</h1>
</div>
<div class="col-12 d-flex justify-content-evenly align-items-center">
  <div
    class="d-flex justify-content-center align-items-center me-5"
    id="div_index_linkA"
  >
    <a id="aTiendaPS4" class="d-flex justify-content-center a_ico_index"
      ><img
        src="./assets/images/nav_icos/ps-logo-ico.svg"
        alt="icono de tienda"
    /></a>
  </div>
  <div
    class="d-flex justify-content-center align-items-center ms-5"
    id="div_index_linkB"
  >
    <a
      id="aTiendaXONE"
      class="d-flex justify-content-center a_ico_index"
      ><img
        src="./assets/images/nav_icos/xbox-logo-ico.svg"
        alt="icono de tienda"
    /></a>
  </div>
</div>
</div>`);
  const aPS4 = document.querySelector("#aTiendaPS4");
  aPS4.addEventListener("click", function () {
    cargarTienda();
    identificarConsola("btnPS4");
  });

  const aXONE = document.querySelector("#aTiendaXONE");
  aXONE.addEventListener("click", function () {
    cargarTienda();
    identificarConsola("btnXONE");
  });
}
async function cargarDetalles(game, consolaInfo) {
  cambiarPage(`   <div class="row" id="pageDetailContainer">
  <div
    class="d-flex justify-content-evenly flex-wrap m-5"
    id="detailCont"
  >
  <div id="backCont" class="d-flex align-self-start">
   <img src="./assets/images/nav_icos/back_ico.svg" alt="Icono de volver" />
  </div>
    <aside
      class="col-sm-12 col-md-4 d-flex flex-column flex-wrap justify-content-center pt-3 pe-3 ps-3"
      id="asideDetalles"
    >
      <div id="imgCont" class="d-flex justify-content-center mb-3"></div>
      <div id="datCont" class="ms-3"></div>
    </aside>
    <section
      class=" col-sm-12 col-md-6 d-flex flex-column flex-wrap justify-content-evenly ps-5 pe-5 me-5"
      id="secDetalles"
    >
      <div id="descCont" class="flex-wrap"></div>
      <div id="videoCont"></div>
    </section>
  </div>
</div>`);
  const imgCont = document.querySelector("#imgCont");
  const img = document.createElement("img");
  const datCont = document.querySelector("#datCont");
  const parrafo = document.createElement("p");
  const descCont = document.querySelector("#descCont");
  const descP = document.createElement("p");
  const tituloH = document.createElement("h2");
  const videoCont = document.querySelector("#videoCont");
  const lnkVolver = document.querySelector("#backCont");
  imgCont.appendChild(img);
  img.src = game.imagenSrc;
  datCont.appendChild(parrafo);
  parrafo.innerHTML = `Género: ${game.genero} <br> Precio: ${game.precio}`;
  descCont.appendChild(tituloH);
  descCont.appendChild(descP);
  tituloH.innerText = game.titulo.toUpperCase();
  descP.innerText = `${game.descripcion}`;
  //Funcion flecha que consume la API de youtube para obtener el iframe del video
  const getIframe = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=player&id=${game.id}&key=AIzaSyA0v1rVjAALrB20vp1hY5MO7ohx395tcuY`
    );
    const result = await response.json();
    let iframeHtml = result.items[0].player.embedHtml;
    iframeHtml = iframeHtml.replace(/width="\d+"/, `width="560"`);
    return iframeHtml;
  };

  const iframe = await getIframe(game.id);
  videoCont.innerHTML = iframe;

  lnkVolver.addEventListener("click", () => {
    cargarTienda();
    identificarConsola(consolaInfo[0].consola);
  });
}
function cargarLogup() {
  cambiarPage(`<div class="row m-0">
  <div
    class="h-100 p-0 m-0 d-flex justify-content-center align-items-center"
  >
    <!-- //DIV CONTIENE EL FORMULARIO Y UN SUBTITULO REFERENCIAL -->
    <!-- //LA CLASE div_border_loginup SE PUEDE VER _loginup.scss -->
    <div
      class="d-inline-flex d-flex flex-column align-items-center justify-content-center m-0 mb-5 mt-5 p-5 flex-wrap div_border_loginup"
    >
      <h1>REGISTRARSE</h1>
      <!-- //FORM CONTIENE LOS CONTROLES -->
      <form action="" class="col-12 mt-4">
        <div class="mb-3">
          <label for="nombre_usuario_log" class="form-label"
            >Nombre de usuario:</label
          >
          <input
            type="text"
            class="form-control"
            id="nombre_usuario_log"
            placeholder="Nombre de usuario"
          />
        </div>
        <div class="mb-3">
          <label for="contrasenia_usuario_log" class="form-label"
            >Crear contraseña:</label
          >
          <input
            type="password"
            class="form-control"
            id="contrasenia_usuario_log"
            placeholder="Contraseña"
          />
        </div>
        <div class="mb-3">
          <label for="contrasenia_usuario_rep_log" class="form-label"
            >Repetir contraseña:</label
          >
          <input
            type="password"
            class="form-control"
            id="contrasenia_usuario_rep_log"
            placeholder="Repetir contraseña"
          />
        </div>
        <div class="mb-3">
          <label for="email_usuario" class="form-label">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email_usuario"
            placeholder="name@example.com"
          />
        </div>
        <div class="d-flex flex-column mb-3">
          <button type="button" id="btnLogup" class="button_form">Registrarse</button>
          <a  id="swapLogIn" class="ms-5"
            >¿Ya estas registrado?</a
          >
        </div>
      </form>
    </div>
  </div>
</div>`);
  const btnLogup = document.querySelector("#btnLogup");
  btnLogup.addEventListener("click", function () {
    const txtUser = document.querySelector("#nombre_usuario_log").value;
    const txtPass = document.querySelector("#contrasenia_usuario_log").value;
    const txtPassRep = document.querySelector(
      "#contrasenia_usuario_rep_log"
    ).value;
    if (txtPass != "" && txtUser != "") {
      if (txtPass == txtPassRep) {
        logUp(txtUser, txtPass);
        txtUser.value = "";
        txtPass.value = "";
        txtPassRep.value = "";
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Las contraseñas deben coincidir!",
        });
      }
    }
  });
  const swapLogIn = document.querySelector("#swapLogIn");
  swapLogIn.addEventListener("click", function () {
    cargarLogin();
  });
}
function cargarLogin() {
  cambiarPage(`<div class="row h-100">
  <div class="d-flex justify-content-center align-items-center">
    <!-- //DIV CONTIENE EL FORMULARIO Y UNA IMAGEN REFERENCIAL -->
    <!-- //LA CLASE div_border_loginup SE PUEDE VER _loginup.scss -->
    <div
      class="d-inline-flex d-flex flex-column align-items-center justify-content-center m-0 mb-5 mt-5 p-5 flex-wrap div_border_loginup"
    >
      <div class="">
        <img
          src="./assets/images/nav_icos/user-registro-ico.svg"
          alt="Perfil de usuario"
          width="100"
          height="75"
        />
      </div>
      <!-- //FORM CONTIENE LOS CONTROLES -->
      <form action="" class="col-12 mt-4">
        <div class="mb-3">
          <label for="nombre_usuario_ini" class="form-label"
            >Usuario:</label
          >
          <input
            type="text"
            class="form-control"
            id="nombre_usuario_ini"
            placeholder="Nombre de usuario"
          />
        </div>
        <div class="mb-3">
          <label for="contrasenia_usuario_ini" class="form-label"
            >Contraseña</label
          >
          <input
            type="password"
            class="form-control"
            id="contrasenia_usuario_ini"
            placeholder="Contraseña"
          />
        </div>
        <div class="d-flex flex-column mb-3">
          <button type="button" id="btnLogin" class="mb-3 button_form">Iniciar</button>
          <a id="swapLogUp" class="ms-4">¿No estas registrado?</a>
        </div>
      </form>
    </div>
  </div>
</div>`);
  const btnLogin = document.querySelector("#btnLogin");
  btnLogin.addEventListener("click", function () {
    const txtName = document.querySelector("#nombre_usuario_ini").value;
    const txtPass = document.querySelector("#contrasenia_usuario_ini").value;
    logIn(txtName, txtPass);
  });
  const swapLogUp = document.querySelector("#swapLogUp");
  swapLogUp.addEventListener("click", function () {
    cargarLogup();
  });
}
function cargarAboutUs() {
  cambiarPage(`<div class="row">
  <!-- //CONTENIDO DE LA PAGINA-->
  <div class="col-12">
    <div
      class="d-flex flex-row align-items-center justify-content-center"
      id="div_about_info"
    >
      <div
        class="col-md-12 col-lg-8 d-flex flex-column align-items-start div_loc_ref"
      >
        <div
          class="d-flex flex-column align-items-start div_about_loc m-3"
        >
          <p class="p_about">
            <img
              src="./assets/images/nav_icos/location-ico.svg"
              alt="ubicación"
              class="me-2"
            />Encontranos en: L. N. Alem 215, Local 16, Monte Grande, Bs.
            As.
          </p>
        </div>
        <div
          class="d-flex flex-column align-items-start mt-5 div_about_loc m-3"
        >
          <p class="p_about">
            <img
              src="./assets/images/nav_icos/clock-ico.svg"
              alt="ubicación"
              class="me-2"
            />Horario de atención:
          </p>
          <ul>
            <li class="p_about ms-5">Lunes a Viernes de 9hs a 19hs</li>
            <li class="p_about ms-5">
              Sabados de 9 a 13hs y de 16 a 20hs
            </li>
          </ul>
        </div>
      </div>
      <div
        class="col-ms-12 col-md-12 col-lg-4 d-flex flex-column align-items-center justify-content-center"
      >
        <div class="d-flex justify-content-center" id="location_map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1821.751452626789!2d-58.46909557444401!3d-34.81670059168507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd161571a21f1%3A0xf0f45268ec345ac3!2sAAC%2C%20Leandro%20N.%20Alem%20215%2C%20C1003%20Monte%20Grande%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1690977607556!5m2!1ses!2sar"
            width="500"
            height="300"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
  <div class="separador"></div>
  <div class="col-sm-12 col-md-12" id="about_text">
    <h1>SOBRE NOSOTROS</h1>
    <!-- // LA CLASE p_about SE VE EN _media_q.scss media 768px -->
    <p class="p_about">
      Dark Games es un local atendido hace más de 10 años por Gamers como
      vos y compartimos la misma pasión que vos por los juegos! Nos
      enorgullece presentar un rincón único en el mundo de los
      videojuegos, donde la pasión y la diversión se unen. Contamos con
      una amplia selección de juegos para Play Station, XBOX y PC, así
      como el compromiso de brindar un servicio personalizado y
      orientación experta Nos dedicamos a la venta, compra y canje de
      videojuegos de todas las consolas; y reparacion de computadoras y
      consolas. Visitanos en nuestro local en Monte Grande, Alem 215 Local
      16, o contactanos por <a href="./inbox.html">inbox</a> o
      <a
        href="https://api.whatsapp.com/send?phone=1123629147"
        target="_blank"
        >Whatsapp</a
      >. Tambien podes seguirnos en
      <a href="https://www.instagram.com/dark_games.mg/" target="_blank"
        >Instagram</a
      >
      (...).
    </p>
    <div>
      <img
        src="./assets/images//webP/about_us.webp"
        alt="us"
        class="img-fluid"
        id="img_about"
      />
    </div>
  </div>
</div>`);
}
//EVENTOS DEL INDEX
const aPS4 = document.querySelector("#aTiendaPS4");
aPS4.addEventListener("click", function () {
  cargarTienda();
  identificarConsola("btnPS4");
});

const aXONE = document.querySelector("#aTiendaXONE");
aXONE.addEventListener("click", function () {
  cargarTienda();
  identificarConsola("btnXONE");
});

//EVENTOS DEL HEADER Y FOOTER
const aIndex = document.querySelector("#aIndex");
aIndex.addEventListener("click", function () {
  cargarIndex();
});
const aTienda = document.querySelector("#aTienda");
aTienda.addEventListener("click", function () {
  cargarTienda();
  identificarConsola("btnPS4");
});
const aLogin = document.querySelector("#aLogin");
aLogin.addEventListener("click", function () {
  cargarLogin();
});
const aLogup = document.querySelector("#aLogup");
aLogup.addEventListener("click", function () {
  cargarLogup();
});
const aAboutUs = document.querySelectorAll(".aAboutUs");
aAboutUs.forEach((el) => {
  el.addEventListener("click", function () {
    cargarAboutUs();
  });
});

//FUNCION QUE COMPRUEBA LA EXISTENCIA DEL USUARIO
function logIn(nombre, password) {
  const userNombre = localStorage.getItem("userNombre");
  const userPassword = localStorage.getItem("userPassword");
  if (userNombre != "" && userPassword != "") {
    if (nombre == userNombre && password == userPassword) {
      document.querySelector("#nombre_usuario_ini").value = "";
      document.querySelector("#contrasenia_usuario_ini").value = "";
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Bienvenido!",
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario y/o contraseña incorrectos",
      });
    }
  }
}
//FUNCION QUE REGISTRA AL USUARIO
function logUp(nombre, password) {
  const chekName = localStorage.getItem("userNombre");
  if (chekName != nombre) {
    localStorage.setItem("userNombre", nombre);
    localStorage.setItem("userPassword", password);
    document.querySelector("#nombre_usuario_log").value = "";
    document.querySelector("#contrasenia_usuario_log").value = "";
    document.querySelector("#contrasenia_usuario_rep_log").value = "";
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Usuario registrado ¡Bienvenido!",
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El nombre de usuario ya esta en uso",
    });
  }
}
