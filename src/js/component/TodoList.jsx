import React, { useState, useEffect } from "react";
import "../../styles/TodoList.scss";

/**
 * !TodoList component
 * * AslanSN 2022-01-07
 * @returns Component containing a todo task register
 */
const TodoList = () => {
	function ErrorObj(ctrl, message = null) {
		this.ctrl = ctrl;
		this.message = message;
	}
	function Task(label, done) {
		(this.label = label), (this.done = done);
	}

	const [list, setList] = useState([]);
	const [used, setUsed] = useState(0);
	const [error, setError] = useState(new ErrorObj(false));
	const url = "https://assets.breatheco.de/apis/fake/todos/user/aslan";

	useEffect(() => {
		fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		})
			.then(response => response.json())
			.then(data => setList(data))
			.then(() => setUsed(+1))
			.catch(err => setError(new ErrorObj(true, String(err))));
	}, []);

	useEffect(() => {
		used >= 1
			? fetch(url, {
					method: "PUT",
					body: JSON.stringify(list),
					headers: {
						"Content-Type": "application/json"
					}
			  }).catch(err => setError(new ErrorObj(true, String(err))))
			: null;
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
			setList([...list, newTask]);
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

	/**
	 *!Checker
	 *? Changes the value.done to his reverse
	 * @param {integer} i
	 */
	const checker = i => {
		list[i].done = !list[i].done;
		setList([...list]);
	};

	/**
	 * !Creates a list from an array
	 * @param {string} value
	 * @param {index} i
	 */
	const listing = (value, i) => (
		<div key={i} className="row taskRow m-1">
			<div className="col col-sm-10 col-lg-10">
				<li
					className={
						"list text-break align-bottom d-inline" +
						(value.done ? "crossed" : "")
					}>
					{value.label} {console.log(i)}
				</li>
			</div>

			<div className="col align-middle col-sm-1 col-lg-1">
				<input
					className="form-check-input align-middle"
					type="checkbox"
					value=""
					id="flexCheckDefault"
					checked={value.done ? "checked" : ""}
					onChange={() => checker(i)}
				/>
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
