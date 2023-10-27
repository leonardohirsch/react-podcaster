# Podcaster React App

## Tecnologías
* **Vite** v.3 (herramienta de compilación)
* **React** v.18
* **React-Redux** v.8 (librería para state management)
* **React Router** v.6 (librería para router)
* **TailwindCSS** v.3 (framework CSS)

## Configuración del proyecto

* [Vite](https://vitejs.dev/) requiere [Node.js](https://nodejs.org) versión 14.18+, 16+

1. Ejecutar comando:

```shell
npm install
```

2. Para setear las variables de entorno en modo desarrollo, crear en el directorio raíz un archivo **.env.local** con el siguiente código:

```shell
VITE_PODCASTS_URL="https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
VITE_EPISODES_URL="https://itunes.apple.com/lookup?media=podcast&entity=podcastEpisode&limit=1000&id="
```


## Cómo lanzar la aplicacion en modo Desarrollo

1. Ejecutar comando:

```shell
npm run dev
```


## Cómo lanzar la aplicacion en modo Producción

1. En el archivo **vite.config.js**, definir mediante la propiedad **base** de la función *defineConfig* el directorio ruta que alojará los archivos compilados. Por default, está establecido que será el directorio */*.

``` shell
export default defineConfig({
  base: '/',
  plugins: [react(), eslint()],
})
```

2. Ejecutar comando:

```shell
npm run build
```

3. El comando anterior creará la carpeta **dist** con los archivos compilados que deberán usarse para producción.