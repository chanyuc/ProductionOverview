let colorIndex = 0;

const getColors = () => {
    const pastelColors = [
      '#FF9999', // Light red
      '#99CCFF', // Light blue
      '#99FF99', // Light green
      '#FFCC99', // Light orange
      '#FF99FF', // Light purple
      '#FFFF99', // Light yellow
      '#FFCCCC', // Light pink
      '#CC99FF', // Light lavender
      '#99FFFF', // Light cyan
      '#FFD699', // Light peach
    ];
  
    const color = pastelColors[colorIndex];
    colorIndex = (colorIndex + 1) % pastelColors.length;
    return color;
  };

  export default getColors;