import dayjs from 'dayjs';
const formatDate = (isoString: string):string => {
    const formatted = dayjs(isoString).format("DD/MM/YYYY HH:mm:ss");
    return formatted;
}

export {formatDate}