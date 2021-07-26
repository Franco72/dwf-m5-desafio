# HOME PAGE

# La home page muestra una bienvenida y tiene un botón que redirige a la page instructions

# (Es una función que devuelve un div con todo el contenido HTML de la página)

# INSTRUCTIONS PAGE

# La instructions page muestra las instrucciones para jugar y tiene un botón que redirige a la page play

# (Es una función que devuelve un div con todo el contenido HTML de la página)

# PLAY PAGE

# Resumidamente, play page es la encargada de montar la cuenta regresiva, decidir si se eligió un movimiento (en caso contrario redirigir el sitio a instructions page), comunicarse con el state para recibir el movimiento que eligió el usuario y el que eligió la máquina y mostrarlos en pantalla, y luego de 3s comunicarse de nuevo con el state para pedir el resultado (si perdiste, ganaste o hubo un empate), pedir los puntos totales de todos los juegos de cada jugador (usuario - máquina) y mostrar todo en pantalla

# (Es una función que devuelve un div con todo el contenido HTML de la página)

# RESULT PAGE

# Result page es un custom element (view-result), se le pueden pasar parámetros como "result", que puede ser 1 / -1 / 0, "player-points" y "machine points" (estos dos últimos se mostrarán en el score)

# En caso de el resultado ser 1 se mostrará un color verde y un texto "ganaste", si el resultado es -1 se mostrará un color rojo y el texto "perdiste", en caso de ser 0 se mostrará un color azul y el texto "empate"

# IMPORTANTE: La forma en la que el estado comunica si ganaste o perdiste es, en caso de ganar devuelve un 1, en caso de perder un -1 y en caso de empate un 0
