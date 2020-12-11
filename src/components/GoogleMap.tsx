import React from "react";
import {GoogleMapProps} from "./GoogleMapProps";

export class GoogleMap extends React.Component<GoogleMapProps, any> {
    componentDidMount() {
        if (GoogleMap.maps.indexOf(this) < 0) {
            GoogleMap.maps.push(this);
        }

        this.mountMap();
    }

    private readonly ref: React.RefObject<HTMLDivElement> = React.createRef();

    render() {
        return (
            <div style={{height: '100%'}} ref={this.ref}/>
        );
    }


    mountMap = () => {
        if (!GoogleMap.mapLoaded) {
            return;
        }

        const map = new google.maps.Map(this.ref.current as HTMLDivElement, {
            mapTypeId: "factorio",
            center: new google.maps.LatLng(0, 0, true),
            zoom: 2
        });

        const imageMapType = new google.maps.ImageMapType({
            tileSize: new google.maps.Size(256, 256),
            getTileUrl(tileCoord: google.maps.Point, zoom: number): string {
                return "http://localhost:8080/?x=" + tileCoord.x * zoom + "&y=" + tileCoord.y * zoom + "&zoom=" + zoom;
            },
            maxZoom: 10,
            minZoom: 1,
            name: "Factorio MAP",
            opacity: 1
        });

        map.mapTypes.set("factorio", imageMapType as google.maps.MapType);

        // imageMapType.projection = new FactorioProjection();
    }

    static mapLoaded: boolean = false;
    static mapsApiLoaded = () => {
        GoogleMap.mapLoaded = true;
        GoogleMap.maps.forEach((map) => {
            map.mountMap();
        })
    }

    static maps: Array<GoogleMap> = new Array<GoogleMap>();
}

class FactorioProjection implements google.maps.Projection {
    fromLatLngToPoint(latLng: google.maps.LatLng, point?: google.maps.Point): google.maps.Point {
        return new google.maps.Point(10.0, 10.0);
    }

    fromPointToLatLng(pixel: google.maps.Point, noWrap?: boolean): google.maps.LatLng {
        return new google.maps.LatLng(9.0, 9.0, noWrap);
    }
}