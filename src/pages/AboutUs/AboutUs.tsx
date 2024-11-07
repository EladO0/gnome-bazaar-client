import { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { Branch } from "../../config/types/locationTypes";
import "./AboutUs.scss";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const maps: Array<Branch> = [
  {
    name: "shir house",
    latitude: 31.9333296,
    longitude: 34.7999968,
  },
  {
    name: "amit house",
    latitude: 31.894756,
    longitude: 34.809322,
  },
];

const AboutUs = () => {
  const [mapCenter, setMapCenter] = useState<Branch>({
    latitude: 31.9333296,
    longitude: 34.7999968,
    name: "center",
  }); // Map's center state
  const [storeLocations, setStoreLocations] = useState<Array<Branch>>([]);
  const [selectedMarker, setSelectedMarker] = useState<Branch | null>(null);

  useEffect(() => {
    const mapsResult = maps;
    setStoreLocations(mapsResult);
    setMapCenter((x) => {
      return mapsResult.length > 0 ? mapsResult[0] : x;
    });
  }, []);

  return (
    <div className="about-us-container">
      <div className="about-us">
        <div className="branches">
          <div className="title">😄 בואו לבקר אותנו</div>
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerClassName="branch-map"
              center={{ lat: mapCenter.latitude, lng: mapCenter.longitude }}
              zoom={10}
            >
              {storeLocations.map((store, index) => (
                <Marker
                  key={index}
                  position={{ lat: store.latitude, lng: store.longitude }}
                  title={store.name}
                  onClick={() => setSelectedMarker(store)}
                />
              ))}
              {selectedMarker && (
                <InfoWindow
                  position={{
                    lat: selectedMarker.latitude,
                    lng: selectedMarker.longitude,
                  }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <h1>{selectedMarker.name}</h1>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="contact-us">
          <div className="title">צרו קשר</div>
          <p>
            תודה שביקרתם באתר שלנו! אנחנו כאן כדי לעזור לכם למצוא את הלבוש
            המושלם עבורכם או עבור הגמד היקר שלכם.
          </p>
          <p>
            אנחנו מבינים שלמצוא את הלבוש המושלם יכול להיות מאתגר, ולכן אנו
            מציעים שירות לקוחות אישי ומקצועי שילווה אתכם לאורך כל הדרך.
            <p>
              בין אם אתם מחפשים פריט ייחודי או זקוקים לייעוץ, אל תהססו לפנות
              אלינו.
            </p>
          </p>
          <p>
            זמני פעילות: א'-ה': 09:00-18:00
            <br /> ו': 09:00-13:00
          </p>
          <p>
            אם יש לכם שאלות, בקשות מיוחדות, או שאתם פשוט צריכים עזרה בבחירת
            המידה הנכונה, אנחנו כאן בשבילכם.
            <br />
            צרו איתנו קשר ישיר באחת מהדרכים הבאות:
            <br />
            דוא"ל: gnome-bazaar@email.com
            <br />
            טלפון: 054-53546765
            <br />
            חנות מפעל: רחוב גמדון 7, עיר הפלאים, ישראל
            <br />
            <br />
            נשמח לשמוע מכם ולעזור לכם למצוא בדיוק את מה שאתם מחפשים, אנחנו
            מתחייבים לחזור אליכם בהקדם האפשרי!
          </p>
        </div>
      </div>
      <div className="guide-video">
        <video width={500} controls>
          <source src={"http://localhost:5000/intro"} />
        </video>
      </div>
    </div>
  );
};
export default AboutUs;
