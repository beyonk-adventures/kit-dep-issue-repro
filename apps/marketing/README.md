# Beyonk Marketing App

These are the Marketing and Static pages for https://www.beyonk.com

See [the tech onboarding instructions](https://www.notion.so/beyonk/Tech-Onboarding-1bf5f21af5954434959255e576d47511) for setup information.

The application uses SvelteKit.

## Apps

Apps live inside the `apps` dir. They are not published to `npm` but are instead deployed to a hosting envirionment, and will deploy only if files within their app directory are touched.

## Components

Components are Svelte components used across multiple apps.

When modifying a component, you should run `pnpm changset` as part of your commit and merge the `PR` it later opens.

## Libraries

Libraries are non-svelte components

When modifying a library, you should run `pnpm changset` as part of your commit and merge the `PR` it later opens.

## PPC pages

### To create a PPC page:

1. create a single file within the `pages` directory of this project and check it in, for example `myppc.html`
2. commit the code to github
3. wait for the build to pass - see https://github.com/beyonk-adventures/lander/actions/workflows/deploy.yml
4. view your page on QA (https://lander-dsrbl-beyonk1.vercel.app/business/myppc)

### Dynamic text for PPC pages

To create dynamic text which can be changed via query string, modify your page as follows:

```html
<h1>{{my_dynamic_text}}</h1>
```

Then pass the variable name declared above to the URL string:

```sh
https://lander-dsrbl-beyonk1.vercel.app/business/myppc?my_dynamic_text=Hello
```

### Deploying

To deploy to production, please ask the engineering team.

## Running against the API

`pnpm dev`
