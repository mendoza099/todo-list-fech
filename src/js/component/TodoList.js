import React, { useState, useEffect } from "react";

export const TodoList = () => {
	const [input, setInput] = useState("");
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/mendoza099", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				//console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})

			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
				setItems(data);
			})

			.catch(error => {
				//error handling
				console.log(error);
			});
	}, []);
	useEffect(
		() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/mendoza099", {
				method: "PUT",
				body: JSON.stringify(items),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					// console.log(resp.text()); // will try return the exact result as string
					return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				})
				.then(data => {
					//here is were your code should start after the fetch finishes
					console.log(data); //this will print on the console the exact object received from the server
				})
				.catch(error => {
					//error handling
					console.log(error);
				});
		},
		[items]
	);

	const inputTask = e => {
		setInput(e.target.value);
	};

	const addItem = event => {
		//evitar procesamiento automático de datos
		event.preventDefault();
		setItems([
			...items,
			{
				label: input,
				done: false
			}
		]);
		console.log(items);
		resetInputFields();
	};

	const resetInputFields = () => {
		setInput("");
	};

	const deleteItem = inputId => {
		const updatedItems = items.filter((input, index) => index !== inputId);
		setItems(updatedItems);
	};

	const textInput = () => {
		var textoInput = "";
		if (items.length === 0) {
			textoInput = "Añade tu primera tarea";
		} else {
			textoInput = "Añade más tareas...";
		}
		return textoInput;
	};

	var itemsLeft = items.length;

	return (
		<div className="container">
			<div className="tittle text-center">
				<h1>todos</h1>
				<div className="cardList">
					<form type="submit" onSubmit={addItem}>
						<input
							className="inputText"
							placeholder={textInput()}
							type="text"
							onChange={inputTask}
							value={input}
						/>
					</form>
					<ul className="list-group list-group-flush">
						{items.map((input, index) => {
							return (
								<li className="list-group-item" key={index}>
									{input.label}
									<button
										type="button"
										className="close"
										onClick={() => deleteItem(index)}>
										&times;
									</button>
								</li>
							);
						})}
						<div id="itemsLeft" className="text-left">
							{itemsLeft} items left
						</div>
					</ul>
				</div>
			</div>
		</div>
	);
};