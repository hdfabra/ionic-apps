import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare const google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  myLocation;
  map: any;
  markers;
  coordenadas: any[];
  coord: { lat: number; lng: number; }[];
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initMap();
    console.log('ionViewDidLoad MapPage');
  }

  addMarker(coord){
    var infoWindow =  new google.maps.InfoWindow({
      content: 'ubicado en: '+coord.lat
    });
    let internalMarker= new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: coord
    });
    internalMarker.addListener('click',()=>{
      infoWindow.open(this.map,internalMarker);  
    });
    console.log(internalMarker);
    this.coordenadas.push(internalMarker);
  }

  clearAllMarkers(){
    this.markers.forEach((marker)=>{
    marker.setMap(null);
    })
    this.markers=[];
  }

  initMap() {

    this.coordenadas=[];
    this.coord=[{lat:4.603899,lng: -74.067230},
      {lat:4.609375,lng: -74.082079},
      {lat:4.613610,lng: -74.066372},
      {lat:4.581586,lng: -74.080585},
      {lat:4.556693,lng: -74.112414},
      {lat:4.521438,lng: -74.089390},
      {lat:4.550937,lng: -74.141717}]
    
    this.myLocation = {lat: 4.646412, lng: -74.077778};
    console.log(this.myLocation)
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: this.myLocation,
      mapTypeId: 'satellite'
    });

    this.markers = new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: this.myLocation
    });

    this.markers.addListener('click', this.toggleBounce.bind(this));
    let bounds = new google.maps.LatLngBounds();
    this.coordenadas.forEach((coord)=>{
      this.addMarker(coord);
      bounds.extend(coord);
    })

    this.map.fitBounds(bounds);
    setTimeout(() => {
      this.clearAllMarkers();
    }, 10000);
  }

  toggleBounce() {
    if (this.markers.getAnimation() !== null) {
      this.markers.setAnimation(null);
    } else {
      this.markers.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  

  
}
