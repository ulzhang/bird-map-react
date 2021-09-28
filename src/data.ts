import { Place } from "./store/models";
import { getDatabase, ref, child, get } from "firebase/database";
const dbRef = ref(getDatabase());
let placeArr: Place[] = []
get(child(dbRef, `sighting`)).then((snapshot) => {
  if (snapshot.exists()) {

      snapshot.forEach(function(child) {
        placeArr.push({
          date: child.val().date,
          position: child.val().LatLng,
          location: child.val().location,
          description: child.val().description
        })
    })
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


export const data: Place[] = [
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
