import React, { useState } from "react";

import "../../styles/TodoList.scss";

const TodoList = () => {
	const [list, setList] = useState([]);

	/**
	 * !Creator
	 * ?Creates a Model
	 * @param {string} label
	 * @param {boolean} done
	 *
	 */
	function Task(label, done) {
		(this.label = ""), (this.done = false);
	}

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
			<div className="col-sm-10 col-lg-10">
				<li key={i} className="list align-bottom d-inline">
					{value}{" "}
				</li>
			</div>
			<div className="col-sm-2 col-lg-2">
				<button
					type="button"
					className="btn  d-inline"
					onClick={() => erase(i)}>
					x
				</button>
			</div>
		</div>
	);

	const AllItems = () =>
		list.length > 0 ? (
			<span className="text-start align-bot Tasks">
				<em>{list.length} tasks</em>
			</span>
		) : (
			""
		);

	return (
		<>
			<div className="container">
				<div className="text-center mt-5 shadow p-3 mb-5 bg-body rounded display">
					<h1 className="title">todos</h1>
					<input
						type="text"
						placeholder="Your new task is..."
						className="form"
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
