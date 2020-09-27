import React from "react";
import { mount } from "enzyme";
import Note from "./Note";

const props = {
	text: "Test",
};

describe("Note", () => {
let note = mount(<Note {...props} />);
	it("renders the note text", () => {
		expect(note.find("div").text()).toEqual(props.text);
	});
});
