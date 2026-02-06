## 2024-05-24 - [Unoptimized Logo Asset]
**Learning:** The site was loading a 351KB JPG logo (`logo.jpg`) on every page via the navbar. This is a significant bandwidth waster for a documentation site where first paint matters.
**Action:** Always check `static/img` folder sizes and prefer SVG for vector graphics like logos. Switched to existing `logo.svg` (6KB) for a ~98% size reduction.
