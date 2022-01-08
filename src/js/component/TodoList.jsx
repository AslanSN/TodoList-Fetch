import React, { useState, useEffect } from "react";
import "../../styles/TodoList.scss";

/**
 * !TodoList component
 * * AslanSN 2022-01-07
 * @returns Component containing a todo task register
 */
const TodoList = () => {
	const [list, setList] = useState([]);
	const [used, setUsed] = useState(0);
	const [error, setError] = useState("");

	function Task(label, done) {
		(this.label = label), (this.done = done);
	}

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/aslan", {
			method: "POST",
			headers: {
				Accept: "application/json"
			},
			body: list
		})
			.then(setUsed(+1))
			.catch(err => {
				setError(err);
				console.error(error);
			});

		list.length > 0
			? fetch("https://assets.breatheco.de/apis/fake/todos/aslan", {
					method: "GET",
					headers: {
						Accept: "application/json"
					}
			  })
					.then(response => {
						response.json();
					})
					.then(data => {
						setList(data);
						setUsed(+1);
					})
					.catch(err => {
						setError(err);
						console.error(error);
					})
			: null;
	}, []);

	useEffect(() => {
		used >= 1
			? fetch("https://assets.breatheco.de/apis/fake/todos/aslan", {
					method: "PUT",
					headers: {
						Accept: "application/json"
					},
					body: list
			  })
					.then(response => {
						response.json();
					})
					.then(setUsed(+1))
					.catch(err => {
						setError(err);
						console.log(error);
					})
			: null &&
			  console.log(`Used should be still be more than 1: ${used}`);
	}, [list]);

	/**
	 * !Saver and controller
	 * @param {Event} ev
	 * @returns Array called List
	 */
	const saveTask = ev => {
		let newTask = new Task("", false);

		if (ev.keyCode === 13) {
			newTask.label = ev.target.value;
		}

		if (newTask.label.length > 0) {
			setList([...list, newTask.label]);
			ev.target.value = "";
		}
	};

	/**
	 * !Eraser
	 * ?Erase each item of the <li/>
	 * @param {Number} i for Index
	 */
	const erase = i => {
		list.splice(i, 1);
		setList([...list]);
	};

	/**
	 * !Destroyer
	 * ?Erase all the list display
	 * @returns empty Array
	 */
	const eraseAll = () => setList(list.splice());

	/**
	 * !Creates a list from an array
	 * @param {string} value
	 * @param {index} i
	 */
	const listing = (value, i) => (
		<div className="row m-1">
			<div className="col col-sm-11 col-lg-11">
				<li
					key={i.toString()}
					className="list text-break align-bottom d-inline">
					{value}{" "}
				</li>
			</div>
			<div className="col align-middle col-sm-1 col-lg-1">
				<button
					type="button"
					className="col x btn align-middle d-inline"
					onClick={() => erase(i)}>
					X
				</button>
			</div>
		</div>
	);

	/**
	 * !Tasks counter
	 * @param {Array} list
	 * @returns task number in HTML
	 */
	const AllItems = () =>
		list.length > 0 ? (
			<span className="text-start align-bot tasks">
				<em>{list.length} tasks</em>
			</span>
		) : (
			""
		);

	return (
		<>
			<div className="container">
				<div className="column text-center mt-5 shadow p-3 mb-5 bg-body rounded display">
					<h1 className="title">TODOS</h1>
					<input
						type="text"
						placeholder="Your new task is..."
						className="form mb-3 light"
						onKeyUp={saveTask}></input>

					<ul>{list.map(listing)}</ul>

					<AllItems />

					<button
						type="button"
						className="btn btn-dark m-2 text-end"
						onClick={() => eraseAll()}>
						Erase All
					</button>
				</div>
			</div>
		</>
	);
};

export default TodoList;
