import React from 'react';
import { shallow } from 'enzyme';
import ExampleWorkModal from "../js/example-work-modal";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter() });

// We don't import jest cause it will run this code


describe("ExampleWorkModal, component", () => {
    let component = shallow(<ExampleWorkModal />);

    let anchors = component.find("a");

    it("Should contain a single 'a' element", () => {
        expect(anchors.length).toEqual(1);
    }
    )
})
