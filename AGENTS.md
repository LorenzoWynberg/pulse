<!-- TRINITY-MANAGED-START -->

## Documentation

`pulse` is a repo of the pulse project, and its root is a package (Pulse). Trinity generates this section from the project packages and rewrites it whenever they change, so write your own notes outside it.

Its documentation starts at [`.trinity/docs/index.md`](.trinity/docs/index.md), which links every page in the `.trinity/docs/` families:

- `rules/<topic>.md`: the rules every change in the package follows
- `gotchas/<tech>.md`: one page per technology in the package stack
- `tech-guide/<section>/<chapter>.md`: how the code works
- `user-guide/<section>/<chapter>.md`: what a person sees and does

<!-- TRINITY-MANAGED-END -->

`DESIGN.md` is the source of the design (tokens in `styles.css`). `package.json` and `package-lock.json` are the record of the stack (counter state is plain browser localStorage, no dependency).
