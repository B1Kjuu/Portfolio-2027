# Design system

## Direction

The portfolio presents one person across two complementary services: digital products and
video editing. Build uses a dark, technical surface; Cut uses warm paper and editorial type.
The first screen stays focused on the offer and the work.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| Ink dark | `#0c0e11` | Build background |
| Ink light | `#e8ecef` | Build foreground |
| Paper | `#efe6d6` | Cut background |
| Ink warm | `#1c1611` | Cut foreground |
| Muted dark | `#98a2ad` | Build secondary text |
| Muted warm | `#655a4b` | Cut secondary text |
| Lime | `#c4f24a` | Build action and emphasis |
| Vermilion | `#cf3a16` | Cut action and emphasis |

These values are defined once in `app/globals.css` and consumed through CSS variables.

## Type

- Hanken Grotesk: body copy and controls.
- Archivo: Build headings and navigation mark.
- Fraunces italic: Cut headings.
- Large display type is intentional, but supporting copy stays readable and concise.

## Interaction rules

- Each page has one entrance: titles rise in (letter by letter on the landing page), then supporting text fades in.
- Continuous loops, and only these: the 3D card shuffle, the tool strips, and the neon pulse around the landing-page portrait.
- The neon pulse is the one attention cue on the site. It marks the portrait as the control that opens About and drags the split. Do not add other blinking or pulsing elements.
- The tool strips autoplay continuously; reduced-motion users get a slower loop rather than a stopped layout.
- Reduced motion: entrances become short fades, the card shuffle and neon pulse stop, and page wipes and hover previews are skipped.
- Animate transforms, opacity, clip-path, and color; do not animate layout dimensions.
- Buttons and linked cards have a clear hover and press response.
- Loading and error states say what is happening: videos show a spinner with "Loading video…", and a failed video gives a direct link to the file.
- Text split into animated letters is hidden from screen readers and paired with the whole word as hidden text, so headings are never read letter by letter or left empty.
