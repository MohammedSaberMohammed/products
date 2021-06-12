export const setIcon = (iconName, extension) => require(`../Images/${iconName}.${extension || 'svg'}`).default;
