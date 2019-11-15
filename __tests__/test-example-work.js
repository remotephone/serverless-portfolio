import React from 'react';
import { shallow } from 'enzyme';
import ExampleWork, { ExampleWorkBubble } from '../js/example-work';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter() });

// We don't import jest cause it will run this code


/* I had to recreate this constant from main.js. In production, this data would typically
be inside of a database. Since I don't have one and don't want my tests to be dependent
on having database, we're going to statically define and reference it */

const myWork = [
    { 
        'title': "Work Example",
        'image': {
            'desc': "example screenshot of a project involving code",
            'src': "images/example1.png",
            'comment': ""
        }
    },
    { 
        'title': "Me IRL",
        'image': {
            'desc': "me irl",
            'src': "images/big-ounce.jpg",
            'comment': "Not sure where big ounce came from"
        }
    }
]



describe("ExampleWork component", () => {
    let component = shallow(<ExampleWork work={myWork}/>)

    it("Should be a 'section' element", () => {

        console.log(component.debug());
        expect(component.type()).toEqual('section');
    });

    it("Should contain as many children as work examples", () => {
        expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
    });

});

describe("ExampleWorkBubble component", () => {
    let component = shallow(<ExampleWorkBubble example={myWork[1]}/>
    )
    // Will return an array. Need to test for single
    let images = component.find("img")

    it("Should contain a single 'img' element", () => {
        expect(images.length).toEqual(1);

    });

    // Got this wrong a few times.
    // images.props will run, but it thinks "src" is a string and fails to compare

    it("Should have the image src set correctly", () => {
        expect(images.prop("src")).toEqual(myWork[1].image.src);
    });
});