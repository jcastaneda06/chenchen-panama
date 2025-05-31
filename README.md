# ChenChen Panamá

🙋🏽‍♂️ ¡Hola! Bienvenido al repositorio oficial de ChenChen Panamá.

## 📎 Tabla de Contenidos

- [Descripción general](#-descripción-general)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Contribuciones](#-contribuciones)
- [Licencia](#-licencia)

## ✍🏽 Descripción general

ChenChen Panamá inició como un pequeño proyecto personal que busca reunir datos públicos oficiales y herramientas para la fiscalización y el combate contra la corrupción en Panamá.

¡Ahora es un proyecto completamente Open Source en el que toda la comunidad de devs en Panamá puede aportar! 🚀

## 🚀 Instalación

Como cualquier otro proyecto de toda la vida, simplemente:

```bash
git clone https://github.com/yourusername/chenchen-panama.git
cd chenchen-panama
npm install
```

¡Y listo! Ya puedes contribuir.

## 🛠️ Uso

La idea es que el proyecto siga escalando de forma colaborativa y activa. Eres libre de usar y cambiar el código fuente como desees, pero intentemos que ChenChen Panamá sea la aplicación por excelencia para poder fiscalizar a dónde va el chen chen del pueblo. Para eso, debemos contribuir basándonos en fuentes confiables y evitar caer en el amarillismo:

### 🔎 ¿Cómo identificar una fuente confiable?

Para identificar fuentes confiables de noticias o información en Panamá y evitar el amarillismo, considera lo siguiente:

- **Verifica la fuente:** Prefiere medios reconocidos, instituciones oficiales o portales con trayectoria comprobada.  
  _Ejemplo:_ Consulta la página oficial de la Asamblea Nacional o medios como La Prensa o TVN Noticias.

- **Consulta varias fuentes:** Contrasta la información en diferentes medios para confirmar su veracidad.  
  _Ejemplo:_ Si lees sobre una nueva ley anticorrupción, verifica la noticia tanto en medios nacionales como en comunicados oficiales del gobierno.

- **Revisa la autoría:** Da prioridad a artículos firmados por periodistas o expertos identificables.  
  _Ejemplo:_ Prefiere reportajes firmados por periodistas como Castalia Pascual o Álvaro Alvarado, en vez de notas anónimas.

- **Evita titulares sensacionalistas:** Desconfía de noticias con títulos exagerados o que apelan a emociones fuertes.  
  _Ejemplo:_ Un titular como “¡Escándalo! Todo el dinero del pueblo desaparece” suele ser menos confiable que “Contraloría investiga presuntas irregularidades en fondos públicos”.

- **Busca evidencia:** Prefiere información respaldada por datos, documentos oficiales o enlaces a fuentes primarias.  
  _Ejemplo:_ Una noticia que adjunta el informe de la Contraloría o enlaces a documentos oficiales es más confiable.

- **Analiza la fecha:** Asegúrate de que la información sea actual y relevante.  
  _Ejemplo:_ Verifica que la noticia sobre cambios en la ley de transparencia sea de este año y no de 2017.

- **Cuida el lenguaje:** Fuentes confiables suelen usar un lenguaje objetivo y neutral, no cargado de opiniones o juicios.  
  _Ejemplo:_ “El Ministerio Público abrió una investigación” es más objetivo que “El Ministerio Público, como siempre, no hace nada”.

Siguiendo estos pasos, ayudamos a mantener la calidad y credibilidad del proyecto. 💡

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Para mantener el orden y la calidad del código, seguimos un flujo de trabajo basado en **git-flow**. Por favor, sigue estos pasos al contribuir:

1. **Trabaja siempre a partir de la rama `develop`.**
2. **Crea una nueva rama para tu feature o fix** usando el siguiente formato:

```
feature/<tus-iniciales>/<descripcion-corta-de-la-feature>
bug/<tus-iniciales>/<descripcion-corta-del-bug>
```

**Ejemplo:**

- Nombre: Jesús Castañeda
- Descripción: Agregar sección de comentarios a la página de planilla
- Rama: `feature/jc/seccion-comentarios-planilla`

> **Nota:** Si tus iniciales ya están en uso por otra persona, utiliza una variación (por ejemplo, las dos primeras letras de tu primer nombre) para evitar confusiones.

3. **Haz tus cambios y commitea con mensajes claros y descriptivos.**
4. **Abre un Pull Request (PR) hacia la rama `develop`.**

- Los títulos y descripciones de los PR pueden estar en **español**, ya que el proyecto está orientado a la comunidad panameña, sin embargo, los nombres de variables, funciones, componentes, etc, deben estar en inglés con excepciones como 'planilla' o 'cedula' que pueden ser nombres de variables o estar incluidos en nombres de funciones o componentes. En tal caso se permitira que dicho nombre propio no esté traducido al inglés.
  _Ejemplo:_

  ```ts
  const planillas = [
    ...new Set(
      [...data].map((o) => o.ubicacion).sort((a, b) => a.localeCompare(b)),
    ),
  ]

  const PlanillaAsamblea: FC = () => {
    const [search, setSearch] = useState<string>()
    const [multiplier, setMultiplier] = useState<'d' | 'm' | 'y'>('m')
    const [filters, setFilters] = useState<Filters>({
      sortBy: 'Nombre',
      sort: '-asc',
      planilla: '',
    })
    //...
  ```

- Asegúrate de describir claramente qué problema resuelve tu PR o qué funcionalidad agrega.

5. **Espera la revisión y feedback antes de hacer merge.**

Si tienes dudas o necesitas ayuda, abre un **issue** o pregunta en las discusiones del repositorio.

¡Gracias por contribuir y ayudar a mejorar ChenChen Panamá! 🎉

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT.
