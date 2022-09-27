import { MapContainer, TileLayer } from 'react-leaflet'
import { useState, useEffect } from 'react'
import Markerposition from './components/Markerposition'

import "leaflet/dist/leaflet.css"
import './App.css';
import arrowIcon from './images/icon-arrow.svg';
import bgImage from './images/pattern-bg.png';



function App() {
  const [address, setAddress] = useState(null)
  const [ipAddress, setIpAddress] = useState("")
  const checkIpAddress = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi
  const checkDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(
          // `https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=8.8.8.8`
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=8.8.8.8`
        )
        const data = await res.json()
        setAddress(data)
      }

      getInitialData()
    } catch (error) {
      console.trace(error)
    }
  }, [])

  const getEnteredData = async () => {
    const res = await fetch(
      // `https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v2/country,city?apiKey=${
      `https://geo.ipify.org/api/v2/country,city?apiKey=${
        process.env.REACT_APP_API_KEY
      }&${
        checkIpAddress.test(ipAddress)
          ? `ipAddress=${ipAddress}`
          : checkDomain.test(ipAddress)
          ? `domain=${ipAddress}`
          : ""
      }`
    )
    const data = await res.json()
    setAddress(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getEnteredData()
    setIpAddress("")
  }

  return (
    <>
      <section>
        <div className="absolute -z-10 w-full">
          <img src={bgImage} alt="bgImage" className="w-full h-80 object-cover" />
        </div>

        <div className="md:p-8 p-6">
          <h1 className="text-2xl lg:text-3xl text-center text-white font-bold mb-8">IP Address Tracker</h1>

          <form 
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex justify-center max-w-xl mx-auto">

            <input type="text" 
              name="ipAddress" 
              id="ipAddress" 
              placeholder="Search for any IP Address or domain" 
              required 
              className="w-full py-2 px-4 rounded-l-lg"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-black py-2 px-4 rounded-r-lg hover:opacity-60"
              onClick={handleSubmit}
              >
              <img src={arrowIcon} alt="arrow" />
            </button>

          </form>
        </div>

        {address && (
          <>
            <div className="md:p-8 px-6 h-0">
              <div className="white__box bg-white rounded-xl md:p-8 p-4 shadow max-w-6xl mx-auto grid grid-cols-1 gap-5 text-center md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:text-left -mb-10 relative lg:-mb-32">
                <div className="lg:border-r lg:border-slate-400 md:p-6">
                  <h2 className="md:text-sm text-xs uppercase text-slate-600 md:mb-2">Ip Address</h2>
                  <p className="font-bold text-slate-900 md:text-2xl text-xl">{address.ip}</p>
                </div>

                <div className="lg:border-r lg:border-slate-400 md:p-6">
                  <h2 className="md:text-sm text-xs uppercase text-slate-600 md:mb-2">Location</h2>
                  <p className="font-bold text-slate-900 md:text-2xl text-xl">{address.location.city}, {address.location.region}</p>
                </div>

                <div className="lg:border-r lg:border-slate-400 md:p-6">
                  <h2 className="md:text-sm text-xs uppercase text-slate-600 md:mb-2">Timezone</h2>
                  <p className="font-bold text-slate-900 md:text-2xl text-xl">UTC {address.location.timezone}</p>
                </div>
                
                <div className="md:p-6">
                  <h2 className="md:text-sm text-xs uppercase text-slate-600 md:mb-2">ISP</h2>
                  <p className="font-bold text-slate-900 md:text-2xl text-xl">{address.isp}</p>
                </div>
              </div>
            </div>

            <MapContainer 
              center={[address.location.lat, address.location.lng]} 
              zoom={13} 
              scrollWheelZoom={true}
              className="leaflet__map"
              >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Markerposition address={address}/>
            </MapContainer>
          </>
        )}

      </section>
    </>
  );
}

export default App;
