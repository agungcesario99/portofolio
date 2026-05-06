# agungcesario.github.io

Personal portfolio website of **Agung Cesario** — Software Quality Assurance Engineer.

Live: <https://agungcesario.github.io/>

## Stack

Vanilla **HTML + CSS + JavaScript** — zero build step, deploys directly from the repo root via GitHub Pages.

## Features

- Minimalist, formal design (navy + gold accent, serif headings + Inter body)
- Light & dark mode with system-preference detection (persisted in `localStorage`)
- Sticky navigation with scroll-spy active link
- Reveal-on-scroll animations (`IntersectionObserver`)
- Animated skill bars
- Interactive contact form with validation (mailto fallback)
- Mobile-friendly responsive layout
- Custom 404 page
- Respects `prefers-reduced-motion`

## Project structure

```
.
├── index.html      # Main page
├── styles.css      # All styling and theme tokens
├── script.js       # Interactivity (theme, nav, scroll-spy, reveal, form)
├── 404.html        # GitHub Pages 404 fallback
└── README.md
```

## Local preview

Any static server works. For example:

```sh
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy to GitHub Pages

1. Create a repository named **`agungcesario.github.io`** under your GitHub account.
2. Push the contents of this folder to the `main` branch:

   ```sh
   git init
   git add .
   git commit -m "feat: initial portfolio"
   git branch -M main
   git remote add origin git@github.com:agungcesario/agungcesario.github.io.git
   git push -u origin main
   ```

3. In the repo settings → **Pages** → set source to **Deploy from a branch** → branch `main` / folder `/ (root)`.
4. Site goes live at <https://agungcesario.github.io/>.

## Customisation

- Colors & spacing: tweak the CSS custom properties at the top of [styles.css](styles.css#L7).
- Content: edit the section markup inside [index.html](index.html).
- Skill bar levels: change the `data-level` attribute on each `<i>` in the Skills section of [index.html](index.html).
