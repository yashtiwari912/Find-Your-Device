const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
     const {latitude ,longitude} = position.coords;
     socket.emit("send-location",{latitude,longitude});   
    },
    (error)=>{
        console.error(error);
    },
    {
        enableHighAccuracy:true,
        maximumAge:0,//caching :false kra hai yha
        timeout:5000
    })
}

//L.map("map");//to ask persons location (leaflet used)

const map = L.map("map").setView([0,0],16);

//to show actual map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:"Yash Tiwari"
}).addTo(map);

const markers = {};

socket.on("recieve-location",(data)=>{
    const {id,latitude,longitude} = data;
    map.setView([latitude,longitude]);
    if(markers[id])
    {
        markers[id].setLatLng([latitude,longitude]);
    }
    else
    {
        markers[id] = L.marker([latitude,longitude]).addTo(map);
    }
});

socket.on("user-disconected",(id)=>{
    if(markers[id])
    {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})