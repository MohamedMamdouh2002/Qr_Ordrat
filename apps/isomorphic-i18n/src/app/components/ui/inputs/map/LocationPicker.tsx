import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
	height: '270px',
	width: '100%'
};

const LocationPicker = ({
	onLocationChange
}: {
	onLocationChange: (val: null | { lat: number; lng: number }) => void;
}) => {
	const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
	const [selectedPosition, setSelectedPosition] = useState<typeof currentPosition | null>(null);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;
				setCurrentPosition({ lat: latitude, lng: longitude });
				setSelectedPosition({ lat: latitude, lng: longitude });
				onLocationChange({ lat: latitude, lng: longitude });
			},
			error => {
				console.error('Error fetching location:', error);
				onLocationChange(null);
			}
		);
	}, [onLocationChange]);

	const handleMapClick = (event: google.maps.MapMouseEvent) => {
		const lat = event?.latLng?.lat();
		const lng = event?.latLng?.lng();
		if (lat && lng) {
			setSelectedPosition({ lat, lng });
			onLocationChange({ lat, lng });
		}
	};

	return (
		<LoadScript googleMapsApiKey="AIzaSyDgsO1fpcQWpFMByZnAeRskAg4T22_Fl38">
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				center={currentPosition}
				zoom={14}
				onClick={handleMapClick}
				options={{
					styles: [
						{
							featureType: 'administrative.locality',
							elementType: 'all',
							stylers: [
								{
									hue: '#2c2e33'
								},
								{
									saturation: 7
								},
								{
									lightness: 19
								},
								{
									visibility: 'on'
								}
							]
						},
						{
							featureType: 'administrative.locality',
							elementType: 'labels.text',
							stylers: [
								{
									visibility: 'on'
								},
								{
									saturation: '-3'
								}
							]
						},
						{
							featureType: 'administrative.locality',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#f39247'
								}
							]
						},
						{
							featureType: 'landscape',
							elementType: 'all',
							stylers: [
								{
									hue: '#ffffff'
								},
								{
									saturation: -100
								},
								{
									lightness: 100
								},
								{
									visibility: 'simplified'
								}
							]
						},
						{
							featureType: 'poi',
							elementType: 'all',
							stylers: [
								{
									hue: '#ffffff'
								},
								{
									saturation: -100
								},
								{
									lightness: 100
								},
								{
									visibility: 'off'
								}
							]
						},
						{
							featureType: 'poi.school',
							elementType: 'geometry.fill',
							stylers: [
								{
									color: '#f39247'
								},
								{
									saturation: '0'
								},
								{
									visibility: 'on'
								}
							]
						},
						{
							featureType: 'road',
							elementType: 'geometry',
							stylers: [
								{
									hue: '#ff6f00'
								},
								{
									saturation: '100'
								},
								{
									lightness: 31
								},
								{
									visibility: 'simplified'
								}
							]
						},
						{
							featureType: 'road',
							elementType: 'geometry.stroke',
							stylers: [
								{
									color: '#f39247'
								},
								{
									saturation: '0'
								}
							]
						},
						{
							featureType: 'road',
							elementType: 'labels',
							stylers: [
								{
									hue: '#008eff'
								},
								{
									saturation: -93
								},
								{
									lightness: 31
								},
								{
									visibility: 'on'
								}
							]
						},
						{
							featureType: 'road.arterial',
							elementType: 'geometry.stroke',
							stylers: [
								{
									visibility: 'on'
								},
								{
									color: '#f3dbc8'
								},
								{
									saturation: '0'
								}
							]
						},
						{
							featureType: 'road.arterial',
							elementType: 'labels',
							stylers: [
								{
									hue: '#bbc0c4'
								},
								{
									saturation: -93
								},
								{
									lightness: -2
								},
								{
									visibility: 'simplified'
								}
							]
						},
						{
							featureType: 'road.arterial',
							elementType: 'labels.text',
							stylers: [
								{
									visibility: 'off'
								}
							]
						},
						{
							featureType: 'road.local',
							elementType: 'geometry',
							stylers: [
								{
									hue: '#e9ebed'
								},
								{
									saturation: -90
								},
								{
									lightness: -8
								},
								{
									visibility: 'simplified'
								}
							]
						},
						{
							featureType: 'transit',
							elementType: 'all',
							stylers: [
								{
									hue: '#e9ebed'
								},
								{
									saturation: 10
								},
								{
									lightness: 69
								},
								{
									visibility: 'on'
								}
							]
						},
						{
							featureType: 'water',
							elementType: 'all',
							stylers: [
								{
									hue: '#e9ebed'
								},
								{
									saturation: -78
								},
								{
									lightness: 67
								},
								{
									visibility: 'simplified'
								}
							]
						}
					]
				}}
			>
				{selectedPosition && <Marker position={selectedPosition} />}
			</GoogleMap>
		</LoadScript>
	);
};

export default LocationPicker;
