// 用于日期增强操作
import dayjs from 'dayjs'
const dateYMD = (date: string): string => {
    return dayjs(date).format('YYYY-MM-DD')
}

export { dateYMD }
