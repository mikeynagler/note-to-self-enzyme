import React, { useState, useEffect } from "react";
import "./App.css";
import { Form, FormControl, Button } from "react-bootstrap";
import Note from "./components/Note";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";

function App() {
	const [collection, setCollection] = useState([]);
	const [text, setText] = useState("");

	const submit = () => {
		const collectionTemp = collection;
		setCollection([...collectionTemp, { text }]);
		bake_cookie("NOTES", [...collectionTemp, { text }]);
	};

	const clearAllNotes = () => {
		setCollection([]);
		delete_cookie("NOTES");
	};
	useEffect(() => {
		setCollection(read_cookie("NOTES"));
		return () => {
			delete_cookie("NOTES");
		};
	}, []);

	return (
		<div className="App">
			<div className="header">Testing</div>
			<Form>
				<FormControl
					type="text"
					onChange={(event) => setText(event.target.value)}
				/>
				<Button onClick={submit}>Submit</Button>
			</Form>

			{collection.map((el) => {
				return <Note text={el.text} key={Math.random(el.text)} />;
			})}
			<Button className="clearbtn" onClick={clearAllNotes}>Clear all</Button>
		</div>
	);
}

export default App;
