// (CY): ParseSaveTime and FormatSaveTime function
export const parseSaveTime = (saveTime) => {
    const year = saveTime.substring(0, 4);
    const month = saveTime.substring(4, 6);
    const day = saveTime.substring(6, 8);
    const hour = saveTime.substring(8, 10);
    const minute = saveTime.substring(10, 12);
    const second = saveTime.substring(12, 14);
  
    const parsedDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
    return parsedDate;
};

export const formatSaveTime = (saveTime) => {
    const hours = saveTime.getHours().toString().padStart(2, '0');
    const minutes = saveTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};
