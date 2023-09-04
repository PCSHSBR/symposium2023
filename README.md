# The 3rd PCSHS Science Symposium 2023 Official Website

![Banner Image](https://termtem-cdn.imgix.net/sym2023/og-image.png?w=1200&h=630&fit=crop&auto=compress)
> https://3rdpss2023.pcshsbr.ac.th

![GitHub last commit (by committer)](https://img.shields.io/badge/PCSHSBR-Student_project-3f1092?style=flat-square) ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/pcshsbr/symposium2023?style=flat-square) ![GitHub repo size](https://img.shields.io/github/repo-size/pcshsbr/symposium2023?style=flat-square) ![GitHub](https://img.shields.io/github/license/pcshsbr/symposium2023?style=flat-square) ![GitHub top language](https://img.shields.io/github/languages/top/pcshsbr/symposium2023?style=flat-square) ![GitHub language count](https://img.shields.io/github/languages/count/pcshsbr/symposium2023?style=flat-square) ![GitHub contributors](https://img.shields.io/github/contributors/pcshsbr/symposium2023?style=flat-square&color=1800a1) ![GitHub issues](https://img.shields.io/github/issues/pcshsbr/symposium2023?style=flat-square) ![GitHub pull requests](https://img.shields.io/github/issues-pr/pcshsbr/symposium2023?style=flat-square) ![GitHub forks](https://img.shields.io/github/forks/pcshsbr/symposium2023?style=social) ![GitHub Repo stars](https://img.shields.io/github/stars/pcshsbr/symposium2023?style=social)

This work is commissioned and owned by the school. 

All source code except for all assets files in this repo (for example but not limited to, any image, logo, and trademark.) are free to use under MIT License. All other source code from third party is up to their their license.

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Deployment

This website is hosted on vercel and build log is in separate repo to avoid using pro plan for deploying a SvelteKit webapp

## URL Path list

```
https://3rdpss2023.pcshsbr.ac.th/
├── (auth)/
│   ├── account
│   ├── auth/
│   │   ├── callback
│   │   ├── list-of-invited
│   │   ├── set-new-password
│   │   └── verify
│   ├── dashboard
│   ├── login
│   ├── logout
│   ├── reset-password
│   └── welcome/
│       └── done
├── (contents)/
│   ├── legal/
│   │   └── privacy-and-terms (WIP)
│   └── projects
├── (staff)/
│   └── manage/
│       └── invite
├── (student-team-contact)/
│   └── my-project/
│       └── edit/
│           ├── step-2-project-information
│           ├── step-3-abstract
│           └── step-4-article
└── api/
    └── v1
```

Edit [HERE](<https://tree.nathanfriend.io/?s=(%27options!(%27fancy!true~fullPath!false~trailingSlash!true~rootDot!false)~E(%27E%27https%3A%2F%2F3rdpss2023.pcshsbr.ac.th%2F6auth8account*authCcallbackCliG-of-inviFdCset-newA5verify*dashboardHinHout*resetAwelcomeCdone6conFnts8legalCprivacy-and-Frms%20%7BWIP89s6Gaff8manageCinviF6Gudent-Fam-contact8my-9Cedit72-9-information73-abGract74-articleBapi*v1%27)~version!%271%27)*B55%20%206B%7B7C5sFp-8%7D*9projectA-password*B%5Cn5C*5Esource!FteGstH*log%01HGFECBA98765*>)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://phu.best"><img src="https://avatars.githubusercontent.com/u/86614284?v=4?s=100" width="100px;" alt="PhubestSrikoon"/><br /><sub><b>PhubestSrikoon</b></sub></a><br /><a href="#code-PhubestSrikooon" title="Code">💻</a> <a href="#design-PhubestSrikooon" title="Design">🎨</a> <a href="#ideas-PhubestSrikooon" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://ptsgrn.dev"><img src="https://avatars.githubusercontent.com/u/49602385?v=4?s=100" width="100px;" alt="Patsagorn Y."/><br /><sub><b>Patsagorn Y.</b></sub></a><br /><a href="#code-ptsgrn" title="Code">💻</a> <a href="#content-ptsgrn" title="Content">🖋</a> <a href="#infra-ptsgrn" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ongsalt"><img src="https://avatars.githubusercontent.com/u/58396464?v=4?s=100" width="100px;" alt="Siraphop"/><br /><sub><b>Siraphop</b></sub></a><br /><a href="#content-ongsalt" title="Content">🖋</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

This repo is licensed under the [MIT License](https://choosealicense.com/licenses/mit/). See the [LICENSE](./LICENSE) file for more details.
