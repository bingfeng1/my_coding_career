import { useDict } from './dict'

const init = async () => {
    // 初始化状态数据
    const dict = useDict()
    await dict.getDictTable()
}
export { init }
