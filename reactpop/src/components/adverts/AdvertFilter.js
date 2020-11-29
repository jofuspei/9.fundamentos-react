import React from 'react';
import { Form, Input, Button, Dropdown } from 'semantic-ui-react';

import Slider from 'rc-slider';

import { getTagList } from '../../api/adds';

import 'rc-slider/assets/index.css';
import './AdvertFilter.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

class AdvertFilter extends React.Component {
	state = {
		name: '',
		sale: 'all',
		price: {
			low: '0',
			up: '10000',
		},
		tags: [],
		tagList: [],
	};

	componentDidMount() {
		this.getTagList();
	}

	handleChange = (ev, { name, value }) =>
		this.setState(() => ({
			[name]: value,
		}));

	handleSliderChange = (ev) => {
		this.setState({ price: { low: ev[0], up: ev[1] } });
	};

	async getTagList() {
		const res = await getTagList();
		this.setState({
			tagList: res.result,
		});
	}

	handleFilterSubmit = () => {
		const { name, sale, price, tags } = this.state;
		this.props.updateFilters({ name, sale, price, tags });
	};

	render() {
		const {
			name,
			sale,
			price: { low, up },
			tags,
			tagList,
		} = this.state;

		const options = tagList.map((value) => {
			return { key: value, text: value, value };
		});

		return (
			<Form onSubmit={this.handleFilterSubmit}>
				<Form.Field>
					<label>Nombre</label>
					<Input
						name="name"
						value={name}
						onChange={this.handleChange}
						placeholder="Buscar..."
					/>
				</Form.Field>
				<Form.Group inline>
					<label>Tipo:</label>
					<Form.Radio
						label="Todo"
						name="sale"
						value="all"
						checked={sale === 'all'}
						onChange={this.handleChange}
					/>
					<Form.Radio
						label="Compra"
						name="sale"
						value="buy"
						checked={sale === 'buy'}
						onChange={this.handleChange}
					/>
					<Form.Radio
						label="Venta"
						name="sale"
						value="sell"
						checked={sale === 'sell'}
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
				<Form.Field className="filterSlider">
					<label>Precio</label>
					<Range
						min={0}
						max={10000}
						allowCross={false}
						value={[low, up]}
						marks={{ 0: '0', [low]: low, [up]: up, 10000: '10000' }}
						tipFormatter={(value) => `${value}`}
						onChange={this.handleSliderChange}
					/>
				</Form.Field>
				<Button primary type="submit">
					Filtrar
				</Button>
			</Form>
		);
	}
}

export default AdvertFilter;
