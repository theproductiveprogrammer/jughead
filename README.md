# Jughead - The ArchieML generator

Create [ArchieML](http://archieml.org) from JSON. Get writers and journalists to work on your data.

The interface between tech guys and the rest of the world has always been...tricky. Tech people like living in neat little structured bubbles and roll their eyes when others don't seem to see how it matters if you indent using two space or four. While everyone else would much prefer writing more freely and not having to remember to add quotes and commas and close braces just to get their ideas out there.

## Enter ArchieML
The amazing people at **The New York Times** discovered and solved this problem. They created a structured format that is structured just enough so that any of their journalists can easily understand and write but which also has perfectly defined rules for generating [JSON](https://www.json.org/) - the tech guys current and reigning structured data queen. They then released this beautifully balanced creation as open source so we all could use it. Check out [the amazing ArchieML](http://archieml.org/).

```
    intro: This is ArchieML     =====>      { "intro": "This is ArchieML",
    author: The NYT Team                      "author": "The NYT Team" }

        Everybody writes                            Tech people can
            ArchieML                            convert it to structured json
```

## The missing piece
When I looked at ArchieML as a tech guy I was captivated - it was a brilliant solution that allowed my users to edit and update data without needing them to be too restricted (or too 'geeky'). It was perfect. However there was just one problem - when I wanted to go the other way around.

There were instances where I already had the data in a nice, structured JSON format and I wanted others to work on it. For that I needed to go the other way around - back from my structured JSON to a nice ArchieML document that others could edit.

Finding nothing like that available in the ArchieML ecosystem, I buckled down and wrote one myself. It works nicely and I am now making this reverse generator freely available to to everyone.

So everyone - here's Jughead - your ArchieML generator.

![Jughead Icon](jughead.png)


Just give it a JSON object and it will return you the ArchieML for it. Then you can use it in your Google Docs or text files or whatever and use slurp it back into JSON when done.

## Usage

First add the package from npm:

        npm add jughead

```
const jughead = require('jughead')
let archietxt = jughead.archieml({
    an: "object",
    with: [
        "an",
        "array"
    ],
    and: { another: [ { type: "array" }, { type: "of" }, { type: "objects" } ] }
}
console.log(archietxt)
```

## Feedback
Please report feedback, issues etc at [the github repo](https://github.com/theproductiveprogrammer/jughead).

## TODO
* [ ] Support sub-arrays
* [ ] Support Freeform Arrays
