# Beyonk Icons

To build, run `pnpm build`

## Ideal implementation description (process)

### The source

* [x] Icons live in Figma, this is the source of truth https://www.figma.com/file/Y5mJmXqDqKA5FRWMoxBglk/Beyonk-Library---Icons?node-id=0%3A1
* [x] Icons are exported to this repo and committed manually to the SVG folder (`/svg`)
* [x] The icons are ran through [svgo](https://github.com/svg/svgo) for optimization to a folder called `svg-optimized`
  * Settings: default + keep SVG viewbox
  * Note that this folder is ignored by git
* [x] The individual icon components get built by looping through a list of files, providing the necessary `width`, `height` and `fillColor` attributes to be able to customize the icon
* The package becomes an npm package

### Usage

* The user calls the icon by `import { IconName } from 'beyonk-icons'`

## Some things to note

* The icons used in the dashboard design are a combination of Mono Icons, Feather icons, Unicons and custom icons. 
* Unlike feather icons, the full paths are exported (not the strokes)
* We make sure the names are the same as the icons used for the dashboard implementation to minimize changes (i.e. a cool goal would be to simply bump the major package version and have everything work)
