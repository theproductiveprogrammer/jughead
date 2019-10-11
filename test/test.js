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

    it('should handle numbers', () => {
        let txt = jughead.archieml({ a: 1 })
        assert(txt === "a: 1")
    })

    it('should handle multiple numbers', () => {
        let txt = jughead.archieml({ a: 1, b: 2, c: 0 })
        assert(txt === "a: 1\nb: 2\nc: 0")
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

    it('should handle objects with more multiple keys', () => {
        toAndfro({
            a: {
                b: "Line1",
                c: "Line2",
                d: "Line3",
                e: "Line4",
                f: "Line5",
            }
        })
    })

    it('should handle objects with fewer multiple keys', () => {
        toAndfro({
            a: {
                b: "Line1",
                c: "Line2",
            }
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

    it('should work with larger sub-objects', () => {
        toAndfro({
            a: {
                b: {
                    c: "with a sub object",
                },
                d: {
                    e: "or more than one",
                },
                f: {
                    g: "or more than one",
                },
                h: {
                    i: "or more than one",
                },
                j: {
                    k: "or more than one",
                }
            }
        })
    })

    it('should work with larger sub-sub-objects', () => {
        toAndfro({ a: "object",
            b: {
                c1: "with a sub object",
                c2: "with a sub object",
                c3: "with a sub object",
                c4: "with a sub object",
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
            { key: "val1", key2: "more", key3: "and more" },
            { key: "val2", key2: "more" },
            { key: "val3", key2: "more", key4: "yet more" },
            { key: "val4", key2: "more" },
            { key: "val5", key2: "more" },
        ]})
    })

   it('should work with repeating arrays inside objects', () => {
       toAndfro({
        sports: {
            EntryQ: "Ask about Sports",
            KB: [
                { Q: "What is your favorite sport?", A: "Cricket", R: "Mine too!" },
                { Q: "What else do you like?", R: "I like alligator wrestling" },
                { Q: "Who is your favorite player?", A: "Ronaldo", R: "Bowl Gates is my man" }
            ]},
        dance : {
            EntryQ: "Ask about dance",
            KB: [
                { Q: "Do you like to dance?", A: "Hell Yeah!", R: "I love the foxtrot!" },
                { Q: "Wanna dance?", A: "Not right now. I have a boyfriend. My number is the pizza place", R: "Elaine?" }
            ]}
       })
   })

  it('should work with a nice mix', () => {
      toAndfro({
          "dance": {
              "cer": "1",
              "arrayName": [
                  {
                      "a": {
                          "name": "Amanda"
                      },
                      "age": "26",
                      "again": {
                          "life": "me",
                          "test": [
                              "123",
                              "456"
                          ]
                      }
                  },
                  {
                      "a": {
                          "name": "Tessa"
                      },
                      "age": "30"
                  }
              ]
          }
      })
  })

  })
})

function toAndfro(o) {
    let txt = jughead.archieml(o)
    let reconstructed = archieml.load(txt)
    assert.deepStrictEqual(reconstructed, o)
}
