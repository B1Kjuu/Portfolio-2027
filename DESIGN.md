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

- Keep one authored motion moment per surface; do not add decorative blinking or pulsing.
- The 3D card shuffle and tool strips are the only continuous loops.
- The tool strips autoplay continuously; reduced-motion users get a slower loop rather than a stopped layout.
- Animate transforms, opacity, clip-path, and color; do not animate layout dimensions.
- Buttons and linked cards have a clear hover and press response.
- Error states explain what happened and provide a direct recovery link.
