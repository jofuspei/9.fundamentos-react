import React from 'react';

import { getTagList, newAdvert } from '../../api/adds';

import Layout from '../layout/Layout';
import { Form, Button, Dropdown, Input, Message } from 'semantic-ui-react';

class NewAdvertPage extends React.Component {
	state = {
		product: {
			name: '',
			selling: 'buy',
			tags: [],
			price: '',
			photo: '',
		},
		tagList: [],
		loading: false,
		error: null,
		success: false,
	};

	componentDidMount() {
		this.getTagList();
	}

	handleChange = (ev, { name, value }) =>
		this.setState((state) => ({
			product: { ...state.product, [name]: value },
		}));

	handlePicture = (ev) =>
		//ToDo: Controlar que se ha subido una imagen y no cualquier otro archivo
		this.setState((state) => ({
			product: { ...state.product, photo: ev.target.files[0].name },
		}));

	handleSubmit = async (ev) => {
		const {
			product: {
				name: nombre,
				selling: venta,
				tags,
				price: precio,
				photo: foto,
			},
		} = this.state;
		const addInfo = { nombre, venta, tags, precio, foto };
		ev.preventDefault();
		this.setState({ loading: true });
		try {
			const result = await newAdvert(addInfo);
			const error = result.ok ? null : { message: result.error };
			setTimeout(() => {
				// Simulate some loading time
				this.setState({ loading: false, error });
				if (result.ok) {
					this.setState({ success: true });
					setTimeout(() => {
						this.setState({ success: false });
						// ToDo: Investigar como resetear el form
					}, 3000);
				}
			}, 1000);
		} catch (error) {
			this.setState({ loading: false, error });
		}
	};

	async getTagList() {
		const res = await getTagList();
		this.setState((state) => ({
			product: { ...state.product },
			tagList: res.result,
		}));
	}

	render() {
		const {
			product: { name, selling, tags, price },
			tagList,
			loading,
			error,
			success,
		} = this.state;

		const options = tagList.map((value) => {
			return { key: value, text: value, value };
		});

		const canSubmit = () => name && tags.length && !!price;

		return (
			<div className="newAdvertcontainer">
				<Layout title="New advert">
					<Form onSubmit={this.handleSubmit} className="newAdvertForm">
						<Form.Field>
							<label>Nombre del producto</label>
							<Input
								type="text"
								name="name"
								value={name}
								onChange={this.handleChange}
								placeholder="Nombre del producto"
							/>
						</Form.Field>
						<Form.Group inline>
							<label>Tipo:</label>
							<Form.Radio
								label="Compra"
								name="selling"
								value="buy"
								checked={selling === 'buy'}
								onChange={this.handleChange}
							/>
							<Form.Radio
								label="Venta"
								name="selling"
								value="sell"
								checked={selling === 'sell'}
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Form.Field>
							<label>Etiquetas</label>
							<Dropdown
								placeholder="Etiquetas"
								name="tags"
								fluid
								multiple
								onChange={this.handleChange}
								selection
								value={tags}
								options={options}
							/>
						</Form.Field>
						<Form.Field>
							<label>Precio</label>
							<Input
								type="number"
								name="price"
								value={price}
								onChange={this.handleChange}
								placeholder="0"
							/>
						</Form.Field>
						<Form.Field>
							<label>Foto</label>
							<input type="file" onChange={this.handlePicture} />
						</Form.Field>
						<Button
							type="submit"
							primary
							loading={loading}
							disabled={!canSubmit()}
						>
							Añadir
						</Button>
					</Form>
					{error && (
						<Message color="red">
							<Message.Header>An error occurred</Message.Header>
							<p>{error.message}</p>
						</Message>
					)}
					{success && (
						<Message color="green">
							<Message.Header>New advert created successfully</Message.Header>
						</Message>
					)}
				</Layout>
			</div>
		);
	}
}

export default NewAdvertPage;
