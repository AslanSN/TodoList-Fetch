import React from "react";

//Resources
import TodoList from "./TodoList.jsx";

//Styles
import HomeStyles from "../../styles/home.scss";
//create your first component
const Home = () => {
	return (
		<div className="container">
			<div className="text-center mt-5 shadow p-3 mb-5 bg-body rounded display">
				<h1 className="title">todos</h1>
				<TodoList></TodoList>
			</div>
		</div>
	);
};

export default Home;
