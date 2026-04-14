import Dict from "../mongodb/visual/dictionary.js";

class DictService {
    async getDictList({ ...args }) {
        return await Dict.find({
            ...args
        })
    }

    async addDict({
        key, value, desc
    }) {
        let dict = new Dict({
            key, value, desc
        })
        return await dict.save()
    }

    async updateDict(
        { _id, ...args }
    ) {
        return await Dict.update({
            _id
        },
            {
                ...args
            }

        )
    }

    async deleteDict({ _id }) {
        return Dict.remove({ _id })
    }

    async addDictItem({ _id, ...args }) {
        let dict = await Dict.findById(_id)
        dict.children.push({
            ...args
        })

        return await dict.save()
    }

    async updateDictItem({ _id, ...args }) {
        let dict = await Dict.findOne({
            'children._id': _id
        })

        let dictItem = dict.children.id(_id)
        Object.keys(args).forEach(key => {
            dictItem[key] = args[key]
        })

        return await dict.save()
    }

    async deleteDictItem({ _id }) {
        let dict = await Dict.findOne({
            'children._id': _id
        })

        dict.children.id(_id).remove()
        return await dict.save()
    }
}

export default DictService