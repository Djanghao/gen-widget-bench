# Weather City Glance Widget

Create a React weather widget component that displays current weather conditions for a city using the provided data.

## Requirements

### Layout & Structure
- Root element must be a `<section>` element
- Display an alert banner at the top if `alerts` array is non-empty, showing the alert title
- Show a header section with the current temperature, high/low temperatures, a weather icon, city name, and condition text
- Include a stats row showing "feels like" temperature, humidity percentage, and wind speed
- Display an hourly forecast grid showing the next 6 hours with time, icon, and temperature

### Data
- Import weather data from `./data.json`
- Temperature values should display with "F" suffix (e.g., "65F")
- Humidity should display with "%" suffix
- Wind should display with "mph" suffix
- Use the `icon` field to display a text glyph: "◔" for moon icons, "◉" for sun icons, "◌" otherwise

### Styling
- Dark theme with blue gradient background
- Rounded corners (border-radius ~24px on root)
- White/light text colors
- Max width of 360px
- Alert banner should have a warm amber/yellow tint
- Hourly forecast items should have a darker background with subtle border
- Use CSS Grid for the hourly forecast layout (6 columns)

### Constraints
- Only use `react` and `./data.json` imports
- Export the component as `default`
- Use inline styles only (no CSS files)
