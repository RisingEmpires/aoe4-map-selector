import React, { useEffect, useState, useCallback } from 'react';
import { useReplicant } from 'use-nodecg';
import Select, { type SingleValue } from 'react-select';
import * as NumericInput from "react-numeric-input";

interface DropdownOption {
	value: string;
	label: string;
	picked: boolean;
}


export function Aoe4MapSelector() {

	//Images of all maps
	const [maps, set_maps] = useReplicant<Array<any>>('assets:maps', []);

	//You know.. I'm starting to think me coding is not a good idea
	const [map1, set_map1] = useReplicant<DropdownOption>('map1', { value: '', label: '', picked: false });

	const [leftMapPicks, set_leftMapPicks] = useReplicant<DropdownOption[]>('leftMapPicks', [{ value: '', label: '', picked: false }]);
	const [leftMapPicksCount, set_leftMapPicksCount] = useReplicant<number>('leftMapPicksCount', 0);

	const [rightMapPicks, set_rightMapPicks] = useReplicant<DropdownOption[]>('rightMapPicks', [{ value: '', label: '', picked: false }]);
	const [rightMapPicksCount, set_rightMapPicksCount] = useReplicant<number>('rightMapPicksCount', 0);

	const [updateGraphics, set_updateGraphics] = useReplicant<boolean>('updateGraphics', true);
	const [doResetDraft, set_doResetDraft] = useReplicant<boolean>('doResetDraft', true);

	//@ts-ignore
	const [options, set_options] = useState([]);

	const [mapSelections, set_mapSelections] = useState([])

	const handleChange1 = (selectedOption) => { set_map1(selectedOption) }

	//Set the options in the dropdown menu to avaliable maps from /assets/aoe4-map-selector/maps
	useEffect(() => {
		if (!maps) return;
		let _array = []
		//Should probably sort the maps so they are in alpabetical order
		maps.forEach((element, i) => {
			//Sometimes just fuck TypeScript.. I give up.. Ignore Errors and it still work 5head
			var name = element.name
			name = name.replace(/_/g, ' ');
			//@ts-ignore
			//set_options(oldArray => [...oldArray, { value: element.url, label: name }]);
			_array.push({ value: element.url, label: name });
		});
		//@ts-ignore
		_array.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
		set_options(_array);
	}, [maps]);

	const resetDraft = () => {
		set_leftMapPicks([])
		set_leftMapPicksCount(1)
		set_leftMapPicksCount(0)

		set_rightMapPicksCount(1)
		set_rightMapPicksCount(0)
		set_rightMapPicks([])

		set_map1({value: "/assets/aoe4-map-selector/maps/Random.png", label: "Random", picked: false})

		set_updateGraphics(!updateGraphics)

		set_doResetDraft(!doResetDraft)
		//for(let i = 0; i < 9; i++){}
	}

	return (
		<div className='w-full'>
			<div className='flex flex-row justify-between'>
				<div className='pl-16 flex flex-col w-1/3 self-start'>
					<h1>Left Picked Maps</h1>
					<input
						className='w-1/4 m-auto text-center'
						type="number"
						min={0}
						max={9}
						value={leftMapPicksCount ?? 0}
						onChange={(event) => {
							set_leftMapPicksCount(parseInt(event.target.value, 10));
						}}
					/>

					{new Array(leftMapPicksCount).fill(undefined).map((_, i) => (
						<MapDropdown key={i} maps={options} target={i} replicant={'leftMapPicks'} inValue={leftMapPicks} />
					))}

				</div>

				<div className='flex flex-col w-1/6'>
					<Select className="mapDropdown" options={options} onChange={handleChange1} value={map1} placeholder={'Select Map'} />
				</div>

				<div className='pr-16 flex flex-col w-1/3 self-start'>
					<h1>Right Picked Maps</h1>
					<input
						className='w-1/4 m-auto text-center'
						type="number"
						min={0}
						max={9}
						value={rightMapPicksCount ?? 0}
						onChange={(event) => {
							set_rightMapPicksCount(parseInt(event.target.value, 10));
						}}
					/>

					{new Array(rightMapPicksCount ?? 0).fill(undefined).map((_, i) => ( 
						<MapDropdown key={i} maps={options} target={i} replicant={'rightMapPicks'} inValue={rightMapPicks} /> 

					))}

				</div>
			</div>

			<div className='flex flex-col'>
				<button onClick={resetDraft}
					className='resetButton m-auto w-1/3'>Reset Map Draft</button>

				<button onClick={() => set_updateGraphics(!updateGraphics)}
					className='updateDraft m-auto w-1/3'>Update Draft Graphics</button>
			</div>

		</div>
	)
}

type MapDropdownProps = {
	maps: DropdownOption[];
	target: number;
	replicant: string;
	inValue: DropdownOption[];
};

const MapDropdown = ({ maps, target, replicant, inValue }: MapDropdownProps) => {

	const [map1, set_map1] = useReplicant<DropdownOption>('map1', { value: '', label: '', picked: false });
	const [replicantValue, set_replicantValue] = useReplicant<DropdownOption[]>(replicant, [{ value: '', label: '', picked: false }]);
	const [updateGraphics, set_updateGraphics] = useReplicant<boolean>('updateGraphics', true);


	//Prevent the module from crashing upon new DB
	if(!inValue) {
		console.log("nope")
		inValue = []
	}

	const handleChange = useCallback(
		(selectedOption: SingleValue<DropdownOption>) => {
			if (!selectedOption) return
			const newRepValue = replicantValue.slice(0);
			//newRepValue[target] = selectedOption;
			newRepValue[target] = {
				value: selectedOption.value,
				label: selectedOption.label,
				picked: replicantValue[target]?.picked || false
			}
			console.log(newRepValue[target])
			set_replicantValue(newRepValue);
		},
		[replicantValue, target],
	);

	const handlePickedChange = () => {

		let newRepValue = replicantValue.slice(0);

		let opposite = !(replicantValue[target]?.picked)
		newRepValue[target] = {
			value: replicantValue[target]?.value || '',
			label: replicantValue[target]?.label || '',
			picked: opposite
		}

		set_replicantValue(newRepValue);
	};

	const PickMap = () => {
		set_map1(inValue[target])

		let newRepValue = replicantValue.slice(0);

		newRepValue[target] = {
			value: replicantValue[target]?.value || '',
			label: replicantValue[target]?.label || '',
			picked: true
		}


		set_replicantValue(newRepValue);

		set_updateGraphics(!updateGraphics)
	}

	return (
		<div className='w-full'>
			<Select className="mapDropdown" options={maps} onChange={handleChange} value={inValue[target]} placeholder={'Select Map'} />
			<label>Map Picked?</label>
			<input className='mr-4' type='checkbox' checked={inValue[target]?.picked}
				onChange={handlePickedChange} />
			<button onClick={PickMap} className='pickMapButton'>Pick Map</button>
		</div>
	);
}