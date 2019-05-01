'use strict'
const assert = require('assert')
const archieml = require('archieml')
const jughead = require('..')

describe('Jughead', () => {
  describe('archieml', () => {

    it('should return same simple object when passed in', () => {
        toAndfro({ a: "simple object" })
    })

    it('should return proper unicode keys as well', () => {
        toAndfro({'☃' : "Unicode Snowman for you and you and you!" })
    })

    it('should return proper unicode keys and values', () => {
        toAndfro({'☃' : "☃ for you and ☃ for you and ☃ you!" })
    })

    it('should handle multi-line strings', () => {
        toAndfro({ a: `Multi
        Line
        String`})
    })

    it('should handle multi-multi-line strings', () => {
        toAndfro({ b: `And
        Multi-multi   multi
                    Line with different whitespace
        Strings`})
    })

    it('should handle objects with multiple keys', () => {
        toAndfro({ a: `Multi
        Line
        String`, b: `And
        Multi-multi   multi
                    Line with different whitespace
        Strings`,
            and: "yet another key",
            1: "numeric keys",
            2: "are also handled"
        })
    })

    it('should work with sub-objects', () => {
        toAndfro({ a: "object",
            b: {
                c: "with a sub object",
            },
            d: {
                e: "or more than one",
            }
        })
    })

    it('should work with sub-sub-sub-objects', () => {
        toAndfro({ a: "object",
            b: {
                c: "with a sub object",
                c1: {
                    and: "a deeper level",
                    yeah: "1",
                    with: {
                        even: "deeper meanings",
                        than: "ever before"
                    },
                    but: "hey"
                },
                life: "goes on",
                the: {
                    great: {
                        thing: {
                            about: {
                                it: {
                                    is: {
                                        that: "it is",
                                        so: "deep",
                                        it: {
                                            "really": "is deep"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            d: {
                e: "or more than one",
            }
        })
    })

    it('should work with arrays', () => {
        toAndfro({ a: [ {only: "repeating"}, {only: "repeating"} ]})
    })


    it('should work with repeating arrays', () => {
        toAndfro({ a: [
            { key: "val1", key2: "more" },
            { key: "val2", key2: "more" },
            { key: "val3", key2: "more" },
            { key: "val4", key2: "more" },
            { key: "val5", key2: "more" },
        ]})
    })

  })
})

function toAndfro(o) {
    let txt = jughead.archieml(o)
    let reconstructed = archieml.load(txt)
    assert.deepStrictEqual(reconstructed, o)
}
