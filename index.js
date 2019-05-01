'use strict'

module.exports = {
    archieml: archieml
}

function archieml(obj) {
    let ret = []
    as_txt_1(obj, [], ret)
    return ret.join('\n')

    /*      outcome/
     * Convert each key into ArchieML formatted text.
     */
    function as_txt_1(obj, parents, acc) {
        for(let k in obj) {
            kv_1(k, obj[k], parents, acc)
        }
    }

    /*      outcome/
     * Valid values for AIML are:
     *  - Simple Strings
     *  - Arrays
     *  - Objects
     */
    function kv_1(key, val, parents, acc) {
        if(!val) return
        if(typeof val === 'string') return string_val_1(key, val, acc)
        if(Array.isArray(val)) return array_val_1(key, val, parents, acc)
        if(typeof val === 'object') return object_val_1(key, val, parents, acc)
    }

    /*      outcome/
     * For a single line string:
     *      key: value
     * For a multi-line string:
     *      key: value
     *           across
     *           lines
     *      :end
     */
    function string_val_1(key, val, acc) {
        acc.push(`${key}: ${val}`)
        if(val.match(/[\n\r]/)) acc.push(':end')
    }

    /*      outcome/
     * Create an object (nested correctly):
     *      {parent.parent.obj}
     *      key: val
     *      key: val
     * Processing the keys recursively
     */
    function object_val_1(key, val, parents, acc) {
        parents.push(key)
        acc.push(`{${parent_objs_1(parents)}}`)
        as_txt_1(val, parents, acc)
        parents.pop()
        acc.push(`{${parent_objs_1(parents)}}`)
    }

    /*      outcome/
     * Create an array (nested correctly):
     *      [parent.parent.arr]
     *      key: val
     *      key: val
     * Processing the keys recursively
     */
    function array_val_1(key, val, parents, acc) {
        if(!val.length) return
        parents.push(key)
        acc.push(`[${parent_objs_1(parents)}]`)
        for(let i = 0;i < val.length;i++) {
            let v = val[i]
            if(typeof v === 'string') {
                acc.push(`* ${v}`)
                if(v.match(/[\n\r]/)) acc.push(':end')
            }
            if(typeof v === 'object') as_txt_1(val[i], [], acc)
        }
        parents.pop()
        acc.push(`[${parent_objs_1(parents)}]`)
    }

    /*      outcome/
     * Given a set of parent objects convert into dotted notation:
     *      parent: subobj1 : subobj2: val
     *      parent.subobj1.subobj2 ...
     */
    function parent_objs_1(parents) {
        return parents.join('.')
    }
}
