import React from 'react';
import { useReplicant } from 'use-nodecg';

interface DropdownOption {
	value: string;
	label: string;
}


export function Index() {
	const [map, set_map] = useReplicant<DropdownOption>('map', { value: '', label: '' });

	return (
		<>
			<img src={map.value}/>
		</>
	);
}