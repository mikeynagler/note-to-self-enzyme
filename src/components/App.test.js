import React from "react";
import { mount } from "enzyme";
import App from "../App";

describe("App", () => {
	let app = mount(<App></App>);
	it("render the App", () => {
		expect(app.find("div.header").text()).toEqual("Testing");
	});

	it("renders the clear button", () => {
		expect(app.find("Button").at(1).text()).toEqual("Clear all");
	});

	describe("when rednering the form", () => {
		it("creates form component", () => {
			expect(app.find("Form").exists()).toEqual(true);
		});
		it("renders formcontrol", () => {
			expect(app.find("FormControl").exists()).toEqual(true);
		});
		it("renders submitBtn", () => {
			expect(app.find("Button").at(0).text()).toEqual("Submit");
		});
	});

	describe("when creating a note", () => {
		let testNote = "test note";
		beforeEach(() => {
			app.find("FormControl").simulate("change", {
				target: { value: testNote },
			});
		});

		describe("submit a new note", () => {
			beforeEach(() => {
				app.find("Button").at(0).simulate("click");
			});
			it("adds the new note", () => {
				expect(app.find("Note div").at(0).text()).toEqual("test note");
            });
            
            afterEach(() => {
                app.find("Button").at(1).simulate("click");
            })

			describe("clicking the clear button", () => {
				beforeEach(() => {
                    app.find("Button").at(0).simulate("click");
					app.find("Button").at(1).simulate("click");
				});
				it("clears the list", () => {
					expect(app.find("Note").exists()).toEqual(false);
				});
			});
		});
	});
});
