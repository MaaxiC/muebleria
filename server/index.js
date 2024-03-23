import { config } from "./config/config.js";
import app from "./app.js";
import { initialSetup } from "./libs/initialSetup.js";

//Inicializacion
let firstRun = false; //Cambiar a false para que se inicialice la base de datos

if (!firstRun) {
    await initialSetup();
    firstRun = true;
}

//Servidor
app.listen(config.server.PORT);
console.log(`Servidor escuchando en ${config.server.PORT}`);
