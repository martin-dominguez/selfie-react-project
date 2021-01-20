export function getIconsPath() {
    if (Liferay.ThemeDisplay) {
        return Liferay.ThemeDisplay.getPathThemeImages().concat("/clay/icons.svg");
    } else {
        return "/o/selfie-react-project//icons/icons.svg";
    }
}