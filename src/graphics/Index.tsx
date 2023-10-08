import React, { useEffect, useState } from 'react';
import { useReplicant } from 'use-nodecg';

interface DropdownOption {
	value: string;
	label: string;
	picked: boolean;
}



export function Index() {

	const [map1, set_map1] = useReplicant<DropdownOption>('map1', { value: '', label: '', picked: false });

	const [leftMapPicks, set_leftMapPicks] = useReplicant<DropdownOption[]>('leftMapPicks', [{ value: '', label: '', picked: false }]);
	const [leftMapPicksCount, set_leftMapPicksCount] = useReplicant<number>('leftMapPicksCount', 0);

	const [rightMapPicks, set_rightMapPicks] = useReplicant<DropdownOption[]>('rightMapPicks', [{ value: '', label: '', picked: false }]);
	const [rightMapPicksCount, set_rightMapPicksCount] = useReplicant<number>('rightMapPicksCount', 0);

	const [updateGraphics, set_updateGraphics] = useReplicant<boolean>('updateGraphics', true);

	//@ts-ignore
	const [leftMaps, set_leftMaps] = useState([]);
	const [rightMaps, set_rightMaps] = useState([]);

	useEffect(() => {
		let l_array = []
		for (let i = 0; i < leftMapPicksCount; i++) {
			//@ts-ignore
			l_array.push(<div className='mapSelector-map'>
				<img className={leftMapPicks[i]?.picked ? 'mapSelector-mapPicked mapSelector-mapPlayed' : 'mapSelector-mapPicked'} key={i} src={leftMapPicks[i]?.value}
					style={{ width: '140px' }} />
				<a className="mapSelector-mapName">{leftMapPicks[i]?.label}</a>
			</div>)
		}
		set_leftMaps(l_array)

		let r_array = []
		for (let i = 0; i < rightMapPicksCount; i++) {
			//@ts-ignore
			r_array.push(<div className='mapSelector-map'>
				<img className={rightMapPicks[i]?.picked ? 'mapSelector-mapPicked mapSelector-mapPlayed' : 'mapSelector-mapPicked'} key={i} src={rightMapPicks[i]?.value}
					style={{ width: '140px' }} />
				<a className="mapSelector-mapName">{rightMapPicks[i]?.label}</a>
			</div>)
		}
		set_rightMaps(r_array)
	}, [updateGraphics])

	const [theme, set_theme] = useReplicant<{ value: string; label: string; }>('theme', { value: '../../../assets/nodecg-themer/themes/default.css', label: 'default' }, { namespace: 'nodecg-themer' });

	const [themeDiv, set_themeDiv] = useState(<></>)

	useEffect(() => {
		console.log(theme)
		if (!theme) return;
		console.log(theme)
		set_themeDiv(<link rel='stylesheet' type='text/css' href={theme.value} />)
	}, [theme])

	return (
		<div className=''>
			{themeDiv}
			<div className='flex flex-col mapSelector-leftSide'>
				{leftMaps}
			</div>


			<div className='flex flex-col mapSelector-middleMap'>
				<img className="mapSelector-mapPicked" src={map1?.value}/>
			</div>


			<div className='flex flex-col mapSelector-rightSide'>
				{rightMaps}
			</div>
		</div>
	);
}