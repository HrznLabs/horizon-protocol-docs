
## 2024-05-24 - Fix jarring reverse-translation on active states
**Learning:** In CSS, when mimicking a physical press on an interactive element via the `:active` pseudo-class (often combined with `scale(0.98)`), never apply an upward translation (e.g., `translateY(-2px)`). This makes the element appear to "pop up" or move towards the user when pressed, which is jarring and counter-intuitive.
**Action:** Always ensure `:active` states translate downwards (e.g., `translateY(1px)`) or remain neutral on the Y-axis to provide natural, tactile feedback that matches user expectations.
