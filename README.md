# selfie-react-project

Demo preparada para el Meetup de LUG de Enero de 2021.
Esta aplicación realiza un selfie y tiene varias opciones seleccionables por rama:
 * [`0-selfie-save-desktop`](https://github.com/martin-dominguez/selfie-react-project/tree/0-selfie-save-desktop): Guarda la imagen en disco
 * [`1-selfie-save-liferay`](https://github.com/martin-dominguez/selfie-react-project/tree/1-selfie-save-liferay): Guarda la imagen en la raíz de Liferay
 * [`2-selfie-save-system-folder`](https://github.com/martin-dominguez/selfie-react-project/tree/2-selfie-save-system-folder): Guarda la imagen en una carpeta definida a nivel de sistema
 * [`3-selfie-save-portlet-folder`](https://github.com/martin-dominguez/selfie-react-project/tree/3-selfie-save-portlet-folder): Guarda la imagen en una carpeta definida en el portlet

 En `master` teneis la versión final.

## Requisitos

 - [Node](https://nodejs.org/): Entorno de ejecución basado en JS. **Requerido v6.11.0 o mayor**, recomendado Node v12.
 - [NPM](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/): Gestores de paquetes para NodeJS.
 - [Yeoman](https://yeoman.io/): Gestor de generadores.  
    `npm install -g yo`
 - [Liferay JS Generator](https://help.liferay.com/hc/es/articles/360029147391-Liferay-JS-Generator): Herramienta de Liferay que genera plantillas para que aplicaciones desarrolladas en JS puedan funcionar en Liferay como widgets.  
    `npm install -g generator-liferay-js`

## Documentación interesante
* [Developing a React Application in Liferay](https://help.liferay.com/hc/es/articles/360029028051-Developing-a-React-Application)
* [Liferay JS Toolkit](https://github.com/liferay/liferay-js-toolkit)
* [Liferay JS Object](https://help.liferay.com/hc/es/articles/360029005792-Liferay-JavaScript-APIs)
* [ReactJS en Español](https://es.reactjs.org/)
* [Liferay NPM bundler](https://github.com/liferay/liferay-js-toolkit/wiki/How-to-use-liferay-npm-bundler)

## Descarga 
    git clone https://github.com/martin-dominguez/selfie-react-project.git

## Compilación Despligue
*Importante*: Previamente abre el fichero `.npmbuildrc` y cambia el atributo *"liferayDir"* con la ruta local de tu instalación

Con Yarn:
    $ cd selfie-react-project
    $ yarn install
    $ yarn deploy

Con NPM:
    $ cd selfie-react-project
    $ npm install
    $ npm run deploy

Si no tienes instalación local en vez de `deploy` escribe `build`. Podrás obtener el fichero JAR de la carpeta `dist`. Por ejemplo:
    $ cd selfie-react-project
    $ yarn install
    $ yarn build
    $ cp dist/selfie-react-project-1.0.0.jar **dónde tu quieras**