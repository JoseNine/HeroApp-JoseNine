# HeroApp

Una aplicación Angular moderna para gestionar héroes con una interfaz limpia y responsiva construida usando Angular Material.

## 🚀 Características

- **Gestión de Héroes**: Crear, leer, actualizar y eliminar héroes
- **Búsqueda y Filtrado**: Funcionalidad de búsqueda en tiempo real con entrada con debounce
- **Paginación**: Paginación configurable con múltiples opciones de tamaño de página (10, 20, 50, 100)
- **Diseño Responsivo**: Construido con Angular Material para una UI moderna y compatible con móviles
- **Estados de Carga**: Indicadores de carga integrados e interceptores
- **Validación de Formularios**: Validación completa de formularios con directivas personalizadas
- **Diálogos de Confirmación**: Diálogos de confirmación amigables para acciones destructivas

## 🛠️ Stack Tecnológico

- **Angular 20.1.0** - Framework Angular más reciente
- **Angular Material 20.2.1** - Biblioteca de componentes UI
- **TypeScript 5.8.2** - JavaScript con tipos seguros
- **RxJS 7.8.0** - Programación reactiva
- **Angular CDK 20.2.1** - Kit de desarrollo de componentes

## 📋 Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn como gestor de paquetes
- Angular CLI 20.1.2
- Docker (opcional, para containerización)

## 🚀 Inicio Rápido

### Instalación

1. Clona el repositorio:

```bash
git clone <repository-url>
cd HeroApp
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm start
```

4. Abre tu navegador y navega a `http://localhost:4200`

## 🐳 Soporte Docker

El proyecto incluye configuración Docker:

- `Dockerfile` para containerización

### Inicializar con Docker

#### Despues de clonar el repositorio: Construir y ejecutar la imagen

1. Construye la imagen Docker:

```bash
docker build -t heroapp .
```

2. Ejecuta el contenedor:

```bash
docker run -p 8080:80 heroapp
```

3. Abre tu navegador y navega a `http://localhost:8080`

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── confirm-dialog/     # Componente de diálogo de confirmación
│   │   ├── hero-details/       # Formulario de creación/edición de héroes
│   │   ├── heroes-list/        # Lista principal de héroes con búsqueda y paginación
│   │   └── loader-spinner/     # Componente indicador de carga
│   ├── directives/
│   │   └── upper-case.directive.ts  # Directiva personalizada de mayúsculas
│   ├── interceptors/
│   │   └── loading.interceptor.ts   # Interceptor HTTP de carga
│   ├── interfaces/
│   │   └── heroes.interface.ts      # Interfaces TypeScript
│   ├── layout/
│   │   └── layout.ts               # Layout principal de la aplicación
│   ├── services/
│   │   ├── hero-service.ts         # Gestión de datos de héroes
│   │   └── loading.service.ts      # Gestión de estados de carga
│   ├── app.config.ts              # Configuración de la aplicación
│   ├── app.routes.ts              # Configuración de rutas
│   └── app.ts                     # Componente raíz
├── main.ts                        # Bootstrap de la aplicación
└── styles.scss                    # Estilos globales
```

## 🎯 Componentes Principales

### Componente HeroesList

- Muestra héroes en una tabla Material
- Implementa funcionalidad de búsqueda con debounce
- Soporta paginación con tamaños de página configurables
- Proporciona operaciones CRUD a través de diálogos

### Componente HeroDetails

- Diálogo modal para crear y editar héroes
- Formularios reactivos con validación
- Directiva personalizada de mayúsculas para entrada de nombres
- Soporta tanto modo de creación como de edición

### HeroService

- Gestiona datos de héroes usando Angular signals
- Implementa operaciones CRUD con cliente HTTP
- Proporciona funcionalidad de búsqueda y paginación
- Utiliza endpoints de API falsos para demostración

## 🔧 Configuración

### Configuración del Entorno

La aplicación utiliza un archivo local `heroes.json` para la persistencia de datos. El servicio está configurado para trabajar tanto con datos locales como con APIs externas.

### Enrutamiento

- La ruta por defecto redirige a `/home`
- Componente de layout cargado de forma diferida para mejor rendimiento

## 🧪 Pruebas

Ejecuta la suite de pruebas:

```bahs
npm test
```

El proyecto incluye pruebas unitarias para:

- Componente
- Servicios

## 📱 Características en Detalle

### Funcionalidad de Búsqueda

- Búsqueda en tiempo real con debounce de 1 segundo
- Coincidencia de nombres insensible a mayúsculas/minúsculas
- Filtrado instantáneo de resultados

### Paginación

- Paginador de Material Design
- Tamaños de página configurables: 10, 20, 50, 100
- Información de conteo total y página

### Validación de Formularios

- Validación de campos requeridos
- Restricciones de longitud máxima
- Directiva personalizada de mayúsculas para nombres de héroes
- Formularios reactivos con manejo adecuado de errores

### Estados de Carga

- Interceptor HTTP para gestión global de carga
- Servicio de carga para estados a nivel de componente
- Componente spinner para retroalimentación visual
