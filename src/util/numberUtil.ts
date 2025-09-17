
const formatNumber = (data: number):string => {
    const formatted: string  =  data.toLocaleString('id-ID')
    return formatted;
}

export {formatNumber}