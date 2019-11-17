
import React from 'react';
import ReactDOM from 'react-dom';
import ExampleWork from './example-work.js';

const myWork = [
    { 
        'title': "Work Example",
        'href': "https://example.com",
        'desc': "filler text uwu",
        'image': {
            'desc': "example screenshot of a project involving code",
            'src': "images/example1.png",
            'comment': ""
        }
    },
    { 
        'title': "Me IRL",
        'href': "https://example.com",
        'desc': "filler text uwu",
        'image': {
            'desc': "me irl",
            'src': "images/big-ounce.jpg",
            'comment': "Not sure where big ounce came from"
        }
    },
    { 
        'title': "Work Example",
        'href': "https://example.com",
        'desc': "filler text uwu",
        'image': {
            'desc': "example screenshot of a project involving cats",
            'src': "images/example3.png",
            'comment': "“Bengal cat” by roberto shabs is licensed under CC BY 2.0 https://www.flickr.com/photos/37287295@N00/2540855181"
        }
    }
]

ReactDOM.render(<ExampleWork work={myWork}/>, document.getElementById('example-work'))