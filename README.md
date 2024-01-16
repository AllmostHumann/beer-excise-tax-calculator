# MERN Todo list with TypeScript

![Excise Tax Calculator](TBA)

## [Demo](https://allmosthumann.github.io/beer-excise-tax-calculator/)

## Introduction

You have to make your life easier, right? 

For this occasion, I have created an application to calculate excise taxes for beer. The application, with the help of React-paparse, takes a generated .CSV file and parses it into a JSON file. Based on the generated JSON file, the table with a list of all the beers is created. Due to the fact that the files generated in my work are not perfect I had to use Regexp. 
With its help, the name of the beer with data such as extract, volume, and type of package are separated into separate columns. In this way we get a table that is readable and ready for eventual editing. 
The table is used primarily for a clear check of the accuracy of the data obtained from the .CSV file and, if necessary, the opportunity to correct it. 

In the next part of the application, the data downloaded from the JSON file is filtered to get rid of non-alcoholic beers (we don't count excise for them in Polish law). The next step, depending on the volume that appears next to the item, the amount of beer is converted according to a simple formula into hectoliters, and then the tax to be paid expressed in Polish zlotys. In addition, with the results you have the opportunity to check whether the brewery is entitled to a 50% discount on the tax. 

All actions from parsing to tax calculation are saved in localstorage just in case ;). 

In the near future I plan to add an option to filter the table, delete/add rows, and improve the look of the whole application. 

Thanks!

**Ps: This application was created to work on files generated in my work. You can assume with 99% certainty that it will not work on files from another brewery.**

Cheers!

## Description

Excise duty calculator for beer according to Polish tax law

## Technologies

- React.js
- Vite
- TypeScript
- Zustand
- Tanstack Table
- React papaparse
- TailwindCSS

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
