import React from 'react';
import { shallow } from 'enzyme';
import ExampleWorkModal from "../js/example-work-modal";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter() });

// We don't import jest cause it will run this code
    const myExample = { 
            'title': "Work Example",
            'href': "https://example.com",
            'desc': "filler text uwu",
            'image': {
                'desc': "example screenshot of a project involving code",
                'src': "images/example1.png",
                'comment': ""
            }
        }

describe("ExampleWorkModal, component", () => {

    let component = shallow(<ExampleWorkModal example={myExample} open={false}/>);
    let openComponent = shallow(<ExampleWorkModal example={myExample} open={true}/>);
    let anchors = component.find("a");

    it("Should contain a single 'a' element", () => {
        expect(anchors.length).toEqual(1);
    });

    it("Should link to our project", () => {
        expect(anchors.prop('href')).toEqual(myExample.href)
    });
    it("Should have modal class set correctly", () => {
        // expect(element.function("open").function(open-close-paren)).newFunction(openclose);
        // Find my component, check if it has a class, test result of that against toBe
        expect(component.find(".background--skyBlue").hasClass("modal--closed")).toBe(true);
        expect(openComponent.find(".background--skyBlue").hasClass("modal--open")).toBe(true);
    });
});
