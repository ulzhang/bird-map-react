import { Place } from "./store/models";
import { getDatabase, ref, child, get } from "firebase/database";
import { LatLngExpression } from "leaflet";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDafTBcwBZ9g7nnzvQYW1m644ZV_sRTvJQ",
  authDomain: "bird-maps-1.firebaseapp.com",
  databaseURL: "https://bird-maps-1-default-rtdb.firebaseio.com",
  projectId: "bird-maps-1",
  storageBucket: "bird-maps-1.appspot.com",
  messagingSenderId: "460361909334",
  appId: "1:460361909334:web:9e8db450c35df6e9bda7f7",
  measurementId: "G-K6PPGQL6T2"
};

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

export async function data():Promise<Place[]> {
// export const data: Observable<Place[]> = () => {
  let placeArr: Place[] = []
  await get(child(dbRef, `sighting`)).then((snapshot) => {
    if (snapshot.exists()) {

        snapshot.forEach(function(child) {
          const latlngexp: LatLngExpression = [child.val().LatLng.lat, child.val().LatLng.lng]
          const place = {
            date: child.val().date,
            position: latlngexp,
            location: child.val().location,
            description: child.val().description
          }
          console.log(place)
          placeArr.push(place)
      })


    } else {
      console.log("No data available");
    }

  }).catch((error) => {
    console.error(error);
  });

  const returnArray: Place[] = [
    { date:"0",
      description:"Mueller Lake Park",
      location:"Mueller Lake Park",
      position:[30.296837121677424,-97.70583834525243]
    },
    { date:"0",
      description:"Zilker Park",
      location:"Zilker Park",
      position:[30.266467999637396,-97.76770124360763]
    },
    { date:"0",
      description:"Texas State Cemetery",
      location:"Texas State Cemetery",
      position:[30.26612885415308,-97.72629372733968]
    },
    { date:"0",
      description:"Austin Animal Center",
      location:"Austin Animal Center",
      position:[30.25236767828445,-97.68987941448056]
    },
    { date:"0",
      description:"IM Fields",
      location:"IM Fields",
      position:[30.315221598446712,-97.72947554456864]
    },
    ...placeArr];
    return returnArray;
}


// export const data: Place[] = getFirebase;
